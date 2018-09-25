package com.egroupai.engine.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import com.egroup.util.AttributeCheck;

/** 
* @author 作者 Daniel
* @date 2018年8月16日 上午9:50:45 
* @version 
* @description:
*/
public class TxtUtil {
	public boolean create(String filePath,List<String> dataList){
		// init func
		final AttributeCheck attributeCheck = new AttributeCheck();
		if(attributeCheck.listNotNull_Zero(dataList)){
			final Path path = Paths.get(filePath);
			try {
				Files.write(path, dataList, Charset.forName("Big5"));
				File file = new File(filePath);
				Thread.sleep(250);
				if(file.exists()){
					System.out.println("Switch file be created");
					return true;
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}	
		}	
		System.out.println("Switch file not be created");
		return false;
	}
}
