package com.egroupai.engine.controller.rest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Controller;

import com.egroup.controller.BaseController;
import com.egroup.util.AttributeCheck;
import com.egroup.util.CopyUtil;
import com.egroup.util.TxtUtil;
import com.egroup.util.UUIDGenerator;
import com.egroup.util.entity.WebResponse;
import com.egroupai.engine.control.EngineFunc;
import com.egroupai.engine.entity.ModelMerge;
import com.egroupai.engine.entity.ModelSwitch;
import com.egroupai.engine.entity.TrainFace;
import com.egroupai.engine.scenario.entity.BlackWhiteResult;

/** 
* @author 作者 Daniel
* @date 2018年8月20日 上午7:51:23 
* @version 
* @description:
*/
@Path("/model")
@Controller
public class ModelRestController extends BaseController{
	
	@GET
	@Path("/reset")
	@Consumes("application/json")
	public Response reset(){
        init();			
		final WebResponse webResponse = new WebResponse(); 
		webResponse.OK();
		return Response.status(webResponse.getStatusCode()).entity(webResponse.getData()).build();	
	}
	
	/**
	 * Model Train
	 * @author Daniel
	 * 1.List<String> imagePathList
	 * 2.String trainName
	 * 3.String scenarioType
	 * 4.Integer blackStauts
	 * 5.String personId
	 * 6.boolean uploadFace
	 * @param trainFace
	 * @param request
	 * @param response
	 * @return
	 */
	@POST
	@Path("/train")
	@Consumes("application/json")
	public Response train(TrainFace trainFace,@Context HttpServletRequest request, @Context HttpServletResponse response) {
		final WebResponse webResponse = new WebResponse(); 
		// init func
		final EngineFunc engineFunc = new EngineFunc();
		final AttributeCheck attributeCheck = new AttributeCheck();		
		// Create train list.txt
		if(attributeCheck.stringsNotNull(trainFace.getTrainName())&&trainFace.getScenarioType()!=null&&trainFace.getBlackStatus()!=null) {	
			// Check image path list not null
			System.out.println("trainFace.getImagePathList()="+trainFace.getImagePathList().size());
			if(attributeCheck.listNotNull_Zero(trainFace.getImagePathList())){
				// init variable
				String outputFacePath = "";
				if(trainFace.isUploadFace()){
					final HttpSession session = request.getSession();
					outputFacePath = session.getServletContext().getRealPath("/resources/upload/face");
				}else{
					outputFacePath = INITIALIZATION.getOutputFace();
				}				
				File file = null;
				boolean flag = true;
				for(int i=0;i<trainFace.getImagePathList().size();i++){
					System.out.println("outputFacePath1="+outputFacePath +"\\"+ trainFace.getImagePathList().get(i));
					file = new File(outputFacePath +"\\"+ trainFace.getImagePathList().get(i));
					System.out.println("outputFacePath file="+file.exists());
					if(!file.exists()){			
						flag = false;
						break;
					}
				}
				if(flag){
					// Set new model
					File modelPath = new File(INITIALIZATION.getModelPath()+MODEL_NOW+".binary");
					System.out.println("modelPath="+modelPath);
					System.out.println("MODEL_NOW="+MODEL_NOW);
					System.out.println("MODEL_NEW="+MODEL_NEW);
					System.out.println("MODEL_NOW.equals(MODEL_NEW)="+MODEL_NOW.equals(MODEL_NEW));
					if(modelPath.exists()&&!MODEL_NOW.equals(MODEL_NEW)){
						// First train the exsit model
						copyModel(INITIALIZATION.getModelPath()+MODEL_NOW, INITIALIZATION.getModelPath()+MODEL_NEW);
					}
					
					// init func
					final UUIDGenerator uuidGenerator = new UUIDGenerator();
					final TxtUtil txtUtil = new TxtUtil();
					// init variable 
					trainFace.setPersonId(trainFace.getPersonId()!=null?trainFace.getPersonId():uuidGenerator.getUUID());
					trainFace.setTrainListPath(INITIALIZATION.getEnginePath()+"\\list.txt");
					trainFace.setModelPath(INITIALIZATION.getModelPath()+MODEL_NEW);
					
					// Create trainListPath Txt
					final List<String> dataList = new ArrayList<>();	
					for(int i =0;i<trainFace.getImagePathList().size();i++){
						dataList.add(outputFacePath +"\\"+ trainFace.getImagePathList().get(i)+"	"+trainFace.getPersonId()+"[No]"+i);
					}					
					txtUtil.create(trainFace.getTrainListPath(), dataList);		
					
					// check model exsit
					final File binaryFile = new File(INITIALIZATION.getModelPath()+MODEL_NEW+".binary");		
					final File binaryFaceInfo = new File(INITIALIZATION.getModelPath()+MODEL_NEW+".faceInfor");		
					System.out.println(INITIALIZATION.getModelPath()+MODEL_NEW+".binary,exist="+binaryFile.exists());
					System.out.println(INITIALIZATION.getModelPath()+MODEL_NEW+".faceInfor,exist="+binaryFaceInfo.exists());
					if(binaryFile.exists()&&binaryFaceInfo.exists()){
						trainFace.setModelExist(true);
					}
					engineFunc.trainFace(trainFace);

					// Insert scenarioInfo
					switch (trainFace.getScenarioType()) {
					case 1:
						final BlackWhiteResult blackWhiteResult = new BlackWhiteResult();
						blackWhiteResult.setPersonId(trainFace.getPersonId());
						blackWhiteResult.setBlackStatus(trainFace.getBlackStatus());
						blackWhiteResult.setPersonName(trainFace.getTrainName());
						BLACKWHITEHASHMAP.put(trainFace.getPersonId(), blackWhiteResult);
						
						switch (trainFace.getBlackStatus()) {
						case 1:
							System.out.println("white");
							WHITEHASHMAP.put(trainFace.getPersonId(), blackWhiteResult);
							break;
						case 2:
							System.out.println("black");
							BLACKHASHMAP.put(trainFace.getPersonId(), blackWhiteResult);
							break;
						}
						break;
					}
					System.out.println("ModelNow="+MODEL_NOW+",ModelNew="+MODEL_NEW);
					webResponse.OK();
				}else{
					webResponse.getError().setMessage("Image file not exist");
					webResponse.UNPROCESSABLE_ENTITY();
				}
			}else{		
				webResponse.getError().setMessage("Image file Json parse no data");
				webResponse.UNPROCESSABLE_ENTITY();
			}
		}else{
			webResponse.getError().setMessage("Data post error");
			webResponse.UNPROCESSABLE_ENTITY();
		}
		return Response.status(webResponse.getStatusCode()).entity(webResponse.getData()).build();			
	}
	
	
	/**
	 * Model Switch
	 * @author Daniel
	 * @param modelSwitch
	 * @param request
	 * @param response
	 * @return
	 */
	@POST
	@Path("/switch")
	@Consumes("application/json")
	public Response modelSwitch(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		final WebResponse webResponse = new WebResponse(); 
		System.out.println("ModelNow="+MODEL_NOW+",ModelNew="+MODEL_NEW);
		System.out.println("INITIALIZATION.getModelPath()+MODEL_NOW="+INITIALIZATION.getModelPath()+MODEL_NEW+".binary");
		System.out.println("INITIALIZATION.getModelPath()+MODEL_NOW="+INITIALIZATION.getModelPath()+MODEL_NEW+".faceInfor");
		if(MODEL_NEW!=null&&!MODEL_NEW.equals(MODEL_NOW)){
			final EngineFunc engineFunc = new EngineFunc();
			ModelSwitch modelSwitch = new ModelSwitch();			
			modelSwitch.setModelBinaryPath(INITIALIZATION.getModelPath()+MODEL_NOW+".binary");
			modelSwitch.setModelFaceInfoPath(INITIALIZATION.getModelPath()+MODEL_NOW+".faceInfor");
			modelSwitch.setNewModelBinaryPath(INITIALIZATION.getModelPath()+MODEL_NEW+".binary");
			modelSwitch.setNewModelFaceInfoPath(INITIALIZATION.getModelPath()+MODEL_NEW+".faceInfor");
			modelSwitch.setSwitchFilePath(INITIALIZATION.getEnginePath()+"\\Singal_For_Model_Switch.txt");
			if(engineFunc.modelSwitch(modelSwitch)){	
				webResponse.OK();
				System.out.println("ModelNow="+MODEL_NOW+",ModelNew="+MODEL_NEW);
			}else{
				System.out.println("Switch file is not exist");
				webResponse.getError().setMessage("Switch file is not exist");
				webResponse.NO_CONTENT();
			}
		}else{
			System.out.println("New model is not exist");
			webResponse.getError().setMessage("New model is not exist");
			webResponse.NO_CONTENT();
		}
		return Response.status(webResponse.getStatusCode()).entity(webResponse.getData()).build();			
	}
	
	/**
	 * Model merge
	 * @author Daniel
	 * 1.String model1Binary 
	 * 2.String model1FaceInfo
	 * 3.String model2Binary 
	 * 4.String model2FaceInfo
	 * 5.String listPath;				ModelList.egroup.List
	 * 6.String trainedBinaryPath; 		eGroup\\eGroup_merged.binary
	 * 7.String trainedFaceInfoPath; 	eGroup\\eGroup_merged.faceInfor
	 * @param modelSwitch
	 * @param request
	 * @param response
	 * @return
	 */
	@POST
	@Path("/merge")
	@Consumes("application/json")
	public Response modelMerge(ModelMerge modelMerge,@Context HttpServletRequest request, @Context HttpServletResponse response) {
		final WebResponse webResponse = new WebResponse(); 
		final EngineFunc engineFunc = new EngineFunc();
		// init variable
		if(engineFunc.modelMerge(modelMerge)){
			webResponse.OK();
			System.out.println("ModelNow="+MODEL_NOW+",ModelNew="+MODEL_NEW);
		}else{
			webResponse.getError().setMessage("Merge file is not exist");
			webResponse.NO_CONTENT();
		}
		return Response.status(webResponse.getStatusCode()).entity(webResponse.getData()).build();			
	}
	
	/**
	 * 複製Model
	 * @param sourceModel 來源Model
	 * @param destModel 輸出Model
	 * @return
	 */
	private void copyModel(String sourceModel,String destModel) {
		// 複製一份Model
		final CopyUtil copyUtil = new CopyUtil();
		final File sourceFile_binary = new File(sourceModel+".binary");
		final File sourceFile_faceInfo = new File(sourceModel+".faceInfor");	
		final File sourceFile_list = new File(sourceModel+".list");	
		// 確認被複製的Model存在
		System.out.println("sourceFile_binary="+sourceFile_binary.getAbsolutePath()+",exist="+sourceFile_binary.exists());
		System.out.println("sourceFile_faceInfo="+sourceFile_faceInfo.getAbsolutePath()+",exist="+sourceFile_faceInfo.exists());
		System.out.println("sourceFile_list="+sourceFile_list.getAbsolutePath()+",exist="+sourceFile_list.exists());
		if(sourceFile_binary.exists()&&sourceFile_faceInfo.exists()&&sourceFile_list.exists()) {
			final File destFile_binary = new File(destModel+".binary");
			final File destFile_faceInfo = new File(destModel+".faceInfor");
			final File destFile_list = new File(destModel+".list");	
			try {
				copyUtil.copyFile(sourceFile_binary, destFile_binary);
				copyUtil.copyFile(sourceFile_faceInfo, destFile_faceInfo);
				copyUtil.copyFile(sourceFile_list, destFile_list);
				while(true) {
					if(destFile_binary.exists()&&destFile_faceInfo.exists()&&destFile_list.exists()) {
						break;
					}else {
						Thread.sleep(100);
					}
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		}
	}
}
