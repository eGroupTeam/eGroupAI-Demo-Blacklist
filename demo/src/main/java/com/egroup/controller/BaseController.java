package com.egroup.controller;

import java.util.HashMap;
import java.util.List;

import com.egroup.util.YamlUtil;
import com.egroupai.engine.scenario.entity.BlackWhiteResult;
import com.egroupai.engine.scenario.entity.TimeRecord;
import com.egroupai.yaml.entity.Initialization;

public class BaseController{
	static protected Integer SCENARIO_TYPE = 1;															// 1 : 黑白名單,2 : CRM管理系統
	static protected HashMap<String,BlackWhiteResult> BLACKWHITEHASHMAP = new HashMap<>();				// 黑白名單資料<PersonId,BlackWhiteResult>
	static protected HashMap<String,BlackWhiteResult> BLACKHASHMAP = new HashMap<>();					// 黑名單資料<PersonId,BlackWhiteResult>
	static protected HashMap<String,BlackWhiteResult> WHITEHASHMAP = new HashMap<>();					// 白名單資料<PersonId,BlackWhiteResult>
	static protected HashMap<String,BlackWhiteResult> NONEHASHMAP = new HashMap<>();					// 未建立名單資料<PersonId,BlackWhiteResult>
	static protected HashMap<String, List<TimeRecord>> TIMERECOREDHASHMAP = new HashMap<>();			// 每個人的辨識紀錄 
	static protected Initialization INITIALIZATION;	
	static protected String MODEL_NOW;
	static protected String MODEL_NEW;
	
	protected void init(){
		final YamlUtil yamlUtil = new YamlUtil();
    	INITIALIZATION =  yamlUtil.loadInitializationYaml(System.getProperty("user.home") + System.getProperty("file.separator")+ "Desktop" 
    			+ System.getProperty("file.separator")+"/Initialization.yaml");
    	BLACKWHITEHASHMAP = new HashMap<>();			// 黑白名單資料<PersonId,BlackWhiteResult>
    	BLACKHASHMAP = new HashMap<>();					// 黑名單資料<PersonId,BlackWhiteResult>
    	WHITEHASHMAP = new HashMap<>();					// 白名單資料<PersonId,BlackWhiteResult>
    	NONEHASHMAP = new HashMap<>();					// 未建立名單資料<PersonId,BlackWhiteResult>
    	TIMERECOREDHASHMAP = new HashMap<>();			// 每個人的辨識紀錄 
        // init 
        MODEL_NOW = "eGroup1.model";
        MODEL_NEW = "eGroup2.model";
	}
}
