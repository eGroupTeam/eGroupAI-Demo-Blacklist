package com.egroupai.engine.controller.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import org.springframework.stereotype.Controller;

import com.egroup.util.AttributeCheck;
import com.egroup.util.entity.WebResponse;
import com.google.gson.Gson;

/** 
* @author 作者 Daniel
* @date 2018年10月9日 上午9:18:42 
* @version 
* @description:
*/

@Path("/face")
@Controller
public class FaceRestController {	
	
	@POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
	 public Response uploadFile(MultipartFormDataInput multipartFormDataInput,@Context HttpServletRequest request, @Context HttpServletResponse response) {
		// init func
		final AttributeCheck attributeCheck = new AttributeCheck();
		// init variable
		final WebResponse webResponse = new WebResponse();
		final HttpSession session = request.getSession();
		// init variable
		final String facePath = session.getServletContext().getRealPath("/resources/upload/face/");
		FileOutputStream fileOutputStream = null;
		String fileName = "";
		List<String> filePathList = new ArrayList<>();
		
		// Get the file
        Map<String, List<InputPart>> uploadForm = multipartFormDataInput.getFormDataMap();
        uploadForm.forEach((key, value) -> {
            System.out.println("Key : " + key + " Value : " + value.toString());
        });
        List<InputPart> inputParts = uploadForm.get("file");
        try {
            for (InputPart inputPart : inputParts) {
	            MultivaluedMap<String, String> header = inputPart.getHeaders();
	            fileName = getFileName(header);
	            String fileNames[] = fileName.toLowerCase().split("\\.");
	            if (fileNames[fileNames.length-1].equals("jpeg")||fileNames[fileNames.length-1].equals("jpg")||fileNames[fileNames.length-1].equals("png")) {
	            	// convert the uploaded file to inputstream
	                InputStream inputStream = inputPart.getBody(InputStream.class,null);
	                byte [] bytes = IOUtils.toByteArray(inputStream);
	                File file = new File(facePath+fileName);
	                if (!file.getParentFile().exists()) {
	                	file.getParentFile().mkdirs();
	                }
	                file.createNewFile();
	                fileOutputStream = new FileOutputStream(file);
	                fileOutputStream.write(bytes);	
	                filePathList.add(fileName);
	            } else {
					webResponse.getError().setMessage("File is not the image");
					webResponse.UNPROCESSABLE_ENTITY();					
				}
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally{
            if(fileOutputStream!=null){
                try {
					fileOutputStream.flush();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }
        }
        if(attributeCheck.listNotNull_Zero(filePathList)){
        	webResponse.setData(filePathList);
    		webResponse.OK();
    		return Response.status(webResponse.getStatusCode()).entity(webResponse.getData()).build();	
        }else{
			webResponse.getError().setMessage("File is not the image");
			webResponse.UNPROCESSABLE_ENTITY();	
			return Response.status(webResponse.getStatusCode()).entity(webResponse.getError()).build();		        	
        }	
	}
	
	private String getFileName(MultivaluedMap<String, String> header) {
        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
    	System.out.println("contentDisposition="+new Gson().toJson(contentDisposition));
    	String[] name=null;
    	String finalFileName="";
        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {
                name = filename.split("=");
                finalFileName = name[1].trim().replaceAll("\"", "");
                return finalFileName;
            }
        }
        return "unknown";
    }
}
