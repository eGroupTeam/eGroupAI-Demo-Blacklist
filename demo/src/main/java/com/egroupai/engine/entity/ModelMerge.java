package com.egroupai.engine.entity;

import java.util.ArrayList;
import java.util.List;

import com.egroupai.engine.control.EngineFunc;
import com.egroup.util.AttributeCheck;

/** 
* @author 作者 Daniel
* @date 2018年8月12日 下午10:47:59 
* @version 
* @description:
*/
public class ModelMerge extends EngineFunc{
	private AttributeCheck attributeCheck = new AttributeCheck();
	private String ListPath;
	private String trainedBinaryPath;
	private String trainedFaceInfoPath;
	private String model1Binary;
	private String model2Binary;
	private String model1FaceInfo;
	private String model2FaceInfo;
	private StringBuilder cli;	
	private List<String> commandList = new ArrayList<String>();
	private String disk;
	
	public String getListPath() {
		return ListPath;
	}
	public void setListPath(String listPath) {
		ListPath = listPath;
	}
	public String getTrainedBinaryPath() {
		return trainedBinaryPath;
	}
	public void setTrainedBinaryPath(String trainedBinaryPath) {
		this.trainedBinaryPath = trainedBinaryPath;
	}
	public String getTrainedFaceInfoPath() {
		return trainedFaceInfoPath;
	}
	public void setTrainedFaceInfoPath(String trainedFaceInfoPath) {
		this.trainedFaceInfoPath = trainedFaceInfoPath;
	}
	public StringBuilder getCli() {
		return cli;
	}
	public void setCli(StringBuilder cli) {
		this.cli = cli;
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
	public void generateCli() {
		this.disk = INITIALIZATION.getEnginePath().substring(0,1);
		if(attributeCheck.stringsNotNull(INITIALIZATION.getEnginePath(),disk,ListPath,trainedBinaryPath,trainedFaceInfoPath)){
			cli = new StringBuilder("cd "+INITIALIZATION.getEnginePath()+" && "+disk+": && ModelMerge "+ListPath+" "+trainedBinaryPath+" "+trainedFaceInfoPath);
			
		}else{
			cli = null;
		}
		System.out.println("cli="+cli);
	}
	public String getModel1Binary() {
		return model1Binary;
	}
	public void setModel1Binary(String model1Binary) {
		this.model1Binary = model1Binary;
	}
	public String getModel2Binary() {
		return model2Binary;
	}
	public void setModel2Binary(String model2Binary) {
		this.model2Binary = model2Binary;
	}
	public String getModel1FaceInfo() {
		return model1FaceInfo;
	}
	public void setModel1FaceInfo(String model1FaceInfo) {
		this.model1FaceInfo = model1FaceInfo;
	}
	public String getModel2FaceInfo() {
		return model2FaceInfo;
	}
	public void setModel2FaceInfo(String model2FaceInfo) {
		this.model2FaceInfo = model2FaceInfo;
	}
}
