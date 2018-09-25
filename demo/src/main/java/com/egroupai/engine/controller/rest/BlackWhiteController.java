package com.egroupai.engine.controller.rest;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PATCH;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.springframework.stereotype.Controller;

import com.egroup.controller.BaseController;
import com.egroup.util.AttributeCheck;
import com.egroup.util.entity.WebResponse;
import com.egroupai.engine.scenario.entity.BlackWhiteResult;
import com.google.gson.Gson;

import ch.qos.logback.core.joran.conditional.IfAction;

/** 
* @author 作者 Daniel
* @date 2018年9月7日 上午7:59:49 
* @version 
* @description:
*/
@Path("/blackWhite")
@Controller
public class BlackWhiteController extends BaseController{
	
	/**
	 * Get BlackWhiteList
	 * @author Daniel
	 * 1.Integer blackStatus(1:white、2:black)
	 * @param blackStatus
	 * @return
	 */
	@GET
	@Path("/")
	@Consumes("application/json")
	public Response black(@QueryParam("blackStatus") Integer blackStatus){
		final WebResponse webResponse = new WebResponse(); 
		if(blackStatus!=null){
			switch (blackStatus) {
			case 1:
				webResponse.setData(WHITEHASHMAP);
				System.out.println("blackStatus="+blackStatus+",WHITEHASHMAP="+new Gson().toJson(WHITEHASHMAP));
				webResponse.OK();
				break;
			case 2:
				webResponse.setData(BLACKHASHMAP);
				System.out.println("blackStatus="+blackStatus+",BLACKHASHMAP="+new Gson().toJson(BLACKHASHMAP));
				webResponse.OK();	
				break;
			}
		}else{
			webResponse.getError().setMessage("HashMap Null");
			webResponse.NO_CONTENT();
		}		
		return Response.status(webResponse.getStatusCode()).entity(webResponse.getData()).build();		
	}
}
