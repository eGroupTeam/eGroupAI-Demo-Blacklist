package com.egroupai.engine.entity;

import java.util.ArrayList;
import java.util.List;

import com.egroupai.engine.control.EngineFunc;
import com.egroup.util.AttributeCheck;

/** 
* @author 作者 Daniel
* @date 2018年8月11日 下午10:30:05 
* @version 
* @description:
*/
public class TrainFace extends EngineFunc{
	private AttributeCheck attributeCheck = new AttributeCheck();
	private boolean isModelExist;
	private String trainListPath;
	private String modelPath;
	private StringBuilder cli;	
	private List<String> commandList = new ArrayList<String>();
	private String disk;
	
	// programe control
	private List<String> imagePathList = new ArrayList<>();
	private String personId;
	private String imagePathJson;
	private String trainName;
	private Integer scenarioType;
	// blackwhite variable
	private Integer blackStatus;
		
	public boolean isModelExist() {
		return isModelExist;
	}
	public void setModelExist(boolean isModelExist) {
		this.isModelExist = isModelExist;
	}
	public String getTrainListPath() {
		return trainListPath;
	}
	public void setTrainListPath(String trainListPath) {
		this.trainListPath = trainListPath;
	}
	public String getModelPath() {
		return modelPath;
	}
	public void setModelPath(String modelPath) {
		this.modelPath = modelPath;
	}
	public StringBuilder getCli() {
		return cli;
	}
	public void setCli(StringBuilder cli) {
		this.cli = cli;
	}
	
	public void generateCli() {
		this.disk = INITIALIZATION.getEnginePath().substring(0,1);
		if(attributeCheck.stringsNotNull(INITIALIZATION.getEnginePath(),disk,trainListPath,modelPath)){
			if(this.isModelExist){
				cli = new StringBuilder("cd "+INITIALIZATION.getEnginePath()+" && "+disk+": && TrainFace --append "+trainListPath+" "+modelPath+"");		
			}else{
				cli = new StringBuilder("cd "+INITIALIZATION.getEnginePath()+" && "+disk+": && TrainFace "+trainListPath+" "+modelPath+"");					
			}
		}else{
			cli = null;
		}
		System.out.println("cli="+cli);
	}
	
	public List<String> getCommandList() {
		if(attributeCheck.stringsNotNull(cli.toString())){
			commandList = new ArrayList<String>();
			commandList.add("cmd");
			commandList.add("/"+disk);
			commandList.add(cli.toString().replace("/", "/"));
		}
		return commandList;
	}
	public void setCommandList(List<String> commandList) {
		this.commandList = commandList;
	}
	public String getDisk() {
		return disk;
	}
	public void setDisk(String disk) {
		this.disk = disk;
	}
	public List<String> getImagePathList() {
		return imagePathList;
	}
	public void setImagePathList(List<String> imagePathList) {
		this.imagePathList = imagePathList;
	}
	public String getImagePathJson() {
		return imagePathJson;
	}
	public void setImagePathJson(String imagePathJson) {
		this.imagePathJson = imagePathJson;
	}
	public String getTrainName() {
		return trainName;
	}
	public void setTrainName(String trainName) {
		this.trainName = trainName;
	}
	public Integer getScenarioType() {
		return scenarioType;
	}
	public void setScenarioType(Integer scenarioType) {
		this.scenarioType = scenarioType;
	}		
	public String getPersonId() {
		return personId;
	}
	public void setPersonId(String personId) {
		this.personId = personId;
	}
	public Integer getBlackStatus() {
		return blackStatus;
	}
	public void setBlackStatus(Integer blackStatus) {
		this.blackStatus = blackStatus;
	}	
}
