package com.egroupai.engine.scenario.entity;

import com.egroupai.engine.entity.FrameFace;

/** 
* @author 作者 Daniel
* @date 2018年8月27日 下午2:28:42 
* @version 
* @description:
*/
public class BlackWhiteResult {
	private String personId;
	private String personName;
	private Integer blackStatus;
	private String frameFacePath;
	private String framePath;
	private String similarity;
	private String systemTime;
	
	// init program process
	private Integer oldBlackStatus;
	
	public String getPersonId() {
		return personId;
	}
	public void setPersonId(String personId) {
		this.personId = personId;
	}	
	public String getPersonName() {
		return personName;
	}
	public void setPersonName(String personName) {
		this.personName = personName;
	}	
	public Integer getBlackStatus() {
		return blackStatus;
	}
	public void setBlackStatus(Integer blackStatus) {
		this.blackStatus = blackStatus;
	}	
	public String getFrameFacePath() {
		return frameFacePath;
	}
	public void setFrameFacePath(String frameFacePath) {
		this.frameFacePath = frameFacePath;
	}
	public String getFramePath() {
		return framePath;
	}
	public void setFramePath(String framePath) {
		this.framePath = framePath;
	}
	public String getSimilarity() {
		return similarity;
	}
	public void setSimilarity(String similarity) {
		this.similarity = similarity;
	}
	public String getSystemTime() {
		return systemTime;
	}
	public void setSystemTime(String systemTime) {
		this.systemTime = systemTime;
	}
	public Integer getOldBlackStatus() {
		return oldBlackStatus;
	}
	public void setOldBlackStatus(Integer oldBlackStatus) {
		this.oldBlackStatus = oldBlackStatus;
	}	
	
}
