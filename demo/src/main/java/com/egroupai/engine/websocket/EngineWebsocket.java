/** 
* @author 作者 Daniel
* @date 2018年8月2日 下午2:04:38 
* @version 
* @description:
*/  
package com.egroupai.engine.websocket; 

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.egroup.controller.BaseController;
import com.egroup.util.AttributeCheck;
import com.egroup.util.DateUtil;
import com.egroup.util.YamlUtil;
import com.egroup.util.DateUtil.Compare;
import com.egroup.util.DateUtil.Formate;
import com.egroupai.engine.control.EngineFunc;
import com.egroupai.engine.control.GetResult;
import com.egroupai.engine.entity.Face;
import com.egroupai.engine.entity.RetrieveFace;
import com.egroupai.engine.scenario.entity.BlackWhiteResult;
import com.egroupai.engine.scenario.entity.TimeRecord;
import com.egroupai.engine.util.CmdUtil;
import com.google.gson.Gson;

@ServerEndpoint(value="/websocket/engine/{scenario}")
public class EngineWebsocket extends BaseController{
	final AttributeCheck attributeCheck = new AttributeCheck();
	 
    private Logger logger = LoggerFactory.getLogger(EngineWebsocket.class);
    static Thread recognition_thread;
    static Thread getResult_thread;
    
    // open websocket connect
    @OnOpen
    public void onOpen(Session session,@PathParam(value = "scenario") Integer scenario_type) throws IOException{
        logger.debug("open websocket");
        if(INITIALIZATION==null){
            init();
        }
        SCENARIO_TYPE = scenario_type;       
        System.out.println("open websocket,scenario_type="+scenario_type);
    }
    
    // Close websocket connect
    @OnClose
    public void onClose(){
        logger.debug("close websocket");
        System.out.println("close websocket");
        getResult_thread.interrupt();
        recognition_thread.interrupt();
        final CmdUtil cmdUtil = new CmdUtil();
        cmdUtil.cmdProcessTerminate("RetrieveFace.exe");
    }
    
    // Get the message 
    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        logger.debug("Get the message");
        System.out.println("Get the message="+message);
        if(attributeCheck.stringsNotNull(message)){
        	 // init func
            final EngineFunc engineFunc = new EngineFunc();
            final Gson gson = new Gson();
                		
    		recognition_thread = new Thread(new Runnable() {
    			@Override			
    			public void run() {
    				if(new File(INITIALIZATION.getModelPath()+ MODEL_NEW+".binary").exists()
    						&&new File(INITIALIZATION.getModelPath()+ MODEL_NEW+".faceInfor").exists()){
						final String oldModel = MODEL_NOW;
						MODEL_NOW = MODEL_NEW;
						MODEL_NEW = oldModel;
    				}
    				// Start the Engine
    		        System.out.println("message="+gson.toJson(message));
    		        RetrieveFace retrieveFace = gson.fromJson(message, RetrieveFace.class);
    		        retrieveFace.setOutputFacePath(INITIALIZATION.getOutputFace());
    		        retrieveFace.setOutputFramePath(INITIALIZATION.getOutputFrame());
    		        retrieveFace.setTrainedBinaryPath(INITIALIZATION.getModelPath()+MODEL_NOW+".binary");
    		        retrieveFace.setTrainedFaceInfoPath(INITIALIZATION.getModelPath()+MODEL_NOW+".faceInfor");
    		        retrieveFace.setJsonPath(INITIALIZATION.getEnginePath()+"\\output");
    		        System.out.println("retrieveFace="+gson.toJson(retrieveFace));
    				engineFunc.retrieveFace(retrieveFace);
    			}
    		});
    		recognition_thread.start();
    		
    		getResult_thread = new Thread(new Runnable() {
    			@Override
    			public void run() {
    				// init func 
    				//Get Real-time data
    				String cacheJsonName = "output.cache.egroup";	// Get Real-time data
    				switch (SCENARIO_TYPE) {
    				case 1:
    					resultCaculate_blackWhite(session,cacheJsonName);
    					break;
    				default:
    					resultCaculate(session,cacheJsonName);
    					break;
    				}
    			}
    		});
    		getResult_thread.start();
        }else{
        	logger.debug("Retrieve setting is null");
        }
    }
    
    // Websocket error  
    @OnError
    public void onError(Session session, Throwable error){
        logger.debug("websocket error");
        error.printStackTrace();
        System.out.println("websocket error");
    }
    
    private void resultCaculate(Session session,String cacheJsonName){
		// init func 
        final Gson gson = new Gson();
		final GetResult getResult = new GetResult();
		List<Face> faceList = new ArrayList<>();
		try {
			while(true) {
				long startTime = System.currentTimeMillis();
				faceList = getResult.cacheResult(INITIALIZATION.getEnginePath(),cacheJsonName);
				// System.out.println("Get Json Using Time:" + (System.currentTimeMillis() - startTime) + " ms,faceList="+new Gson().toJson(faceList));
				if(attributeCheck.listNotNull_Zero(faceList)){
					session.getBasicRemote().sendText("faceList ="+gson.toJson(faceList));
				}
				Thread.sleep(500);
			}	
		}catch (IllegalStateException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			System.out.println("IllegalStateException");
		}catch (InterruptedException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			System.out.println("InterruptedException");
		} catch (IOException e1) {
			// TODO Auto-generated catch block
//			e1.printStackTrace();
			System.out.println("IOException");
		}
    }
    
    private void resultCaculate_blackWhite(Session session,String cacheJsonName){
    	// init func 
        final Gson gson = new Gson();
		final GetResult getResult = new GetResult();
		List<Face> faceList = new ArrayList<>();
		List<BlackWhiteResult> blackWhiteResultList = new ArrayList<>();
		BlackWhiteResult blackWhiteResult = new BlackWhiteResult();
		final DateUtil dateutil = new DateUtil();
		
		// init variable
		String dateString = "";
		String faceDateString ="";
		try {
			while(true) {
				blackWhiteResultList = new ArrayList<>();
				long startTime = System.currentTimeMillis();
				faceList = getResult.cacheResult(INITIALIZATION.getEnginePath(),cacheJsonName);
				// System.out.println("Get Json Using Time:" + (System.currentTimeMillis() - startTime) + " ms");
				if(attributeCheck.listNotNull_Zero(faceList)){
					for(Face face : faceList){
						faceDateString = face.getSystemTime().substring(0, face.getSystemTime().lastIndexOf(":"));
						if(!attributeCheck.stringsNotNull(dateString)||dateutil.getDateString_compare2Date(Formate.YMD_SPACE_HMS_, Compare.AFTER, faceDateString, dateString)){
							blackWhiteResult = BLACKWHITEHASHMAP.get(face.getPersonId());
							if(blackWhiteResult!=null){							
								blackWhiteResult.setFrameFacePath(face.getFrameFace().getFrameFacePath());
								blackWhiteResult.setFramePath(face.getFramePath());
								blackWhiteResult.setSimilarity(face.getSimilarFaceList().get(0).getSimilarity());
								blackWhiteResult.setSystemTime(dateutil.getDateStringTransfer_localDateTime(Formate.YMD_SPACE_HMS_, Formate.YMDTHMS_,faceDateString));
							}else{		
								blackWhiteResult = new BlackWhiteResult();
								blackWhiteResult.setPersonId(face.getPersonId());
								blackWhiteResult.setBlackStatus(0);
								blackWhiteResult.setPersonName("查無此人");
								blackWhiteResult.setFrameFacePath(face.getFrameFace().getFrameFacePath());
								blackWhiteResult.setFramePath(face.getFramePath());
								blackWhiteResult.setSystemTime(dateutil.getDateStringTransfer_localDateTime(Formate.YMD_SPACE_HMS_, Formate.YMDTHMS_,faceDateString));
							}
							blackWhiteResultList.add(blackWhiteResult);
						}
					}	
					if(attributeCheck.listNotNull_Zero(blackWhiteResultList)){
						session.getBasicRemote().sendText(gson.toJson(blackWhiteResultList));
						dateString = faceList.get(faceList.size()-1).getSystemTime().substring(0, faceList.get(faceList.size()-1).getSystemTime().lastIndexOf(":"));
					}
				}
				Thread.sleep(500);
			}	
		}catch (IllegalStateException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			System.out.println("IllegalStateException");
		}catch (InterruptedException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
			System.out.println("InterruptedException");
		} catch (IOException e1) {
			// TODO Auto-generated catch block
//			e1.printStackTrace();
			System.out.println("IOException");
		}
    }
}