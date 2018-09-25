package com.egroupai.engine.control;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.egroup.controller.BaseController;
import com.egroup.util.AttributeCheck;
import com.egroupai.engine.entity.ModelMerge;
import com.egroupai.engine.entity.ModelSwitch;
import com.egroupai.engine.entity.RetrieveFace;
import com.egroupai.engine.entity.TrainFace;
import com.egroupai.engine.util.CmdUtil;
import com.egroupai.engine.util.TxtUtil;

/**
 * EngineControl Func
* @author 作者 Daniel
* @date 2018年8月10日 上午10:54:20 
* @version 
* @description:
 */
public class EngineFunc extends BaseController{
//	public static void main(String args[]){
//		// RetrieveFace
//		RetrieveFace retrieveFace = new RetrieveFace();
//		retrieveFace.setThreshold(0.7);
//		retrieveFace.setHideMainWindow(false);
//		retrieveFace.setResolution("720p");
//		retrieveFace.setOutputFacePath("outputFace");
//		retrieveFace.setOutputFramePath("outputFrame");
//		retrieveFace.setCam("0");
//		retrieveFace.setMinimumFaceSize(100);
//		retrieveFace.setTrainedBinaryPath("eGroup\\eGroup.Model.binary");
//		retrieveFace.setTrainedFaceInfoPath("eGroup\\eGroup.Model.faceInfor");
//		retrieveFace.setJsonPath("output");
//		retrieveFace(retrieveFace);
		
//		// TrainFace
//		TrainFace trainFace = new TrainFace();
//		trainFace.setModelExist(false);
//		trainFace.setTrainListPath("list1.txt");
//		trainFace.setModelPath("eGroup1\\eGroup.Model");
//		trainFace(trainFace);
//		
//		trainFace.setModelExist(false);
//		trainFace.setTrainListPath("list2.txt");
//		trainFace.setModelPath("eGroup2\\eGroup.Model");
//		trainFace(trainFace);
		
//		// ModelMerge
//		ModelMerge modelMerge = new ModelMerge();
//		modelMerge.setListPath(ENGINEPATH+"\\ModelList.egroup.List");
//		modelMerge.setTrainedBinaryPath(ENGINEPATH+"\\eGroup_merge\\eGroup_merged.binary");
//		modelMerge.setTrainedFaceInfoPath(ENGINEPATH+"\\Engine\\eGroup_merge\\eGroup_merged.faceInfor");
//		modelMerge.setModel1Binary(ENGINEPATH+"\\eGroup1\\eGroup.Model.binary");
//		modelMerge.setModel1FaceInfo(ENGINEPATH+"\\eGroup1\\eGroup.Model.faceInfor");
//		modelMerge.setModel2Binary(ENGINEPATH+"\\eGroup2\\eGroup.Model.binary");
//		modelMerge.setModel2FaceInfo(ENGINEPATH+"\\eGroup2\\eGroup.Model.faceInfor");
//		modelMerge(modelMerge);
		
//		// ModelSwitch
//		ModelSwitch modelSwitch = new ModelSwitch();
//		modelSwitch.setNewModelBinaryPath(ENGINEPATH+"\\eGroup5\\eGroup.Model.binary");
//		modelSwitch.setNewModelFaceInfoPath(ENGINEPATH+"\\eGroup5\\eGroup.Model.faceInfor");
//		modelSwitch.setSwitchFilePath(ENGINEPATH+"\\Singal_For_Model_Switch.txt");
//		modelSwitch(modelSwitch);
//	}
		
	public  boolean trainFace(TrainFace trainFace){		
		boolean flag = false;
		// init func 
		trainFace.generateCli();
		if(trainFace.getCommandList()!=null){
			final CmdUtil cmdUtil = new CmdUtil();
			flag = cmdUtil.cmdProcessBuilder(trainFace.getCommandList());				
		}
		return flag;
	}
	
	public  boolean retrieveFace(RetrieveFace retrieveFace){		
		boolean flag = false;
		// init func 
		retrieveFace.setEnginePath(INITIALIZATION.getEnginePath());
		retrieveFace.generateCli();
		if(retrieveFace.getCommandList()!=null){
			final CmdUtil cmdUtil = new CmdUtil();
			flag = cmdUtil.cmdProcessBuilder(retrieveFace.getCommandList());				
		}
		return flag;
	}
	
	public  boolean modelMerge(ModelMerge modelMerge){
		// init func
		final AttributeCheck attributeCheck = new AttributeCheck();
		// init variable
		boolean flag = false;		
		if(attributeCheck.stringsNotNull(modelMerge.getListPath(),modelMerge.getTrainedBinaryPath(),modelMerge.getTrainedFaceInfoPath()
				,modelMerge.getModel1Binary(),modelMerge.getModel2Binary(),modelMerge.getModel1FaceInfo(),modelMerge.getModel2FaceInfo())){
			// init variable
			final File model1BinaryFile = new File(modelMerge.getModel1Binary());
			final File model2BinaryFile = new File(modelMerge.getModel2Binary());
			final File model1FaceInfoFile = new File(modelMerge.getModel1FaceInfo());
			final File model2FaceInfoFile = new File(modelMerge.getModel2FaceInfo());
			if(attributeCheck.fileExist(model1BinaryFile,model2BinaryFile,model1FaceInfoFile,model2FaceInfoFile)){
				// init func
				final TxtUtil txtUtil = new TxtUtil();
				
				// Model Merge Txt
				final List<String> dataList = new ArrayList<>();
				dataList.add(modelMerge.getModel1Binary()+" [eGroupSplit] "+modelMerge.getModel1FaceInfo());
				dataList.add(modelMerge.getModel2Binary()+" [eGroupSplit] "+modelMerge.getModel2FaceInfo());				
				txtUtil.create(modelMerge.getListPath(), dataList);
				
				modelMerge.generateCli();
				if(modelMerge.getCommandList()!=null){
					final CmdUtil cmdUtil = new CmdUtil();
					flag = cmdUtil.cmdProcessBuilder(modelMerge.getCommandList());				
				}
			}
		}
		return flag;
	}
	
	public  boolean modelSwitch(ModelSwitch modelSwitch){
		// init variable
		boolean flag = false;
		// init variable
		final File newModelBinary = new File(modelSwitch.getNewModelBinaryPath());
		final File newModelFaceInfo = new File(modelSwitch.getNewModelFaceInfoPath());
		// Check Model Files 
		System.out.println("newModelBinary.exists()="+newModelBinary.exists());
		System.out.println("newModelFaceInfo.exists()="+newModelFaceInfo.exists());
		System.out.println("newModelBinary="+newModelBinary.getAbsolutePath());
		System.out.println("newModelFaceInfo="+newModelFaceInfo.getAbsolutePath());
		if(newModelBinary.exists()&&newModelFaceInfo.exists()) {			
			// Model 
			final List<String> dataList = new ArrayList<>();
			dataList.add(modelSwitch.getNewModelBinaryPath());
			dataList.add(modelSwitch.getNewModelFaceInfoPath());
			
			// init func
			final TxtUtil txtUtil = new TxtUtil();
			System.out.println("modelSwitch.getSwitchFilePath()="+modelSwitch.getSwitchFilePath());
			flag = txtUtil.create(modelSwitch.getSwitchFilePath(), dataList);
			File file;
			try {
				while(true){					
					if(flag){
						file = new File(modelSwitch.getSwitchFilePath());
						if(!file.exists()){
							final String oldModel = MODEL_NOW;
							final File oldModelBinary = new File(modelSwitch.getModelBinaryPath());
							final File oldModelFaceInfo = new File(modelSwitch.getModelFaceInfoPath());
							final File oldModelList = new File(INITIALIZATION.getModelPath()+MODEL_NEW+".model.list");
							oldModelBinary.delete();
							oldModelFaceInfo.delete();
							oldModelList.delete();
							MODEL_NOW = MODEL_NEW;
							MODEL_NEW = oldModel;
							break;
						}
						System.out.println("Model is Switching...");
						Thread.sleep(1000);
					}
				}
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			flag = true;
		}	
		return flag;
	}
}
