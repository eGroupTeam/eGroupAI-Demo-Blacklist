package com.egroup.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

/**
 * @author 作者 Daniel
 * @date 2018年8月16日 上午9:50:45
 * @version
 * @description:
 */
public class TxtUtil {
	public static void main(String args[]){
		try {
			File file = new File("D:/WorkSpace/egroupai/.metadata/.plugins/org.eclipse.wst.server.core/tmp1/wtpwebapps/keyGen/resources/license/key/a013a95ac8db480fb8d1e98d26287dca/decode/result.txt");
			System.out.println("file="+file.getAbsolutePath());
			List<String> lines = Files.readAllLines(Paths.get("D:/WorkSpace/egroupai/.metadata/.plugins/org.eclipse.wst.server.core/tmp1/wtpwebapps/keyGen/resources/license/key/a013a95ac8db480fb8d1e98d26287dca/decode/result.txt"));
			System.out.println("lines="+new Gson().toJson(lines));
			String[] header = lines.get(0).split(": ");
			String[] HeaderID = lines.get(1).split(": ");
			String[] ExpiredDdays = lines.get(2).split(": ");
			String[] Company = lines.get(3).split(": ");
			System.out.println("header="+header[1]);
			System.out.println("HeaderID="+HeaderID[1]);
			System.out.println("ExpiredDdays="+ExpiredDdays[1]);
			System.out.println("Company="+Company[1]);
			
			String []record;
			for(int i=4;i<lines.size();i++){
				record = lines.get(i).split("		");
				System.out.println("Record="+record[1]);				
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void create(String filePath, List<String> dataList) {
		// init func
		final AttributeCheck attributeCheck = new AttributeCheck();
		if (attributeCheck.listNotNull_Zero(dataList)) {
			final Path file = Paths.get(filePath);
			try {
				Files.write(file, dataList, Charset.forName("Big5"));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	/**
	 * Read the txt and return content
	 * @author Daniel
	 *
	 * @param txtPath
	 * @return
	 */
	public String read_content(String txtPath) {		
		List<String> lines = null;
		try {
			lines = Files.readAllLines(Paths.get(txtPath));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		StringBuilder stringBuilder = new StringBuilder();
		for (String line : lines) {
			if (stringBuilder.length() > 0) {
				stringBuilder.append("\n");
			}
			stringBuilder.append(line);
		}
		String contents = stringBuilder.toString();
		System.out.println(contents);
		return contents;		
	}
	
	/**
	 * Read the txt and return line content list
	 * @author Daniel
	 *
	 * @param txtPath
	 * @return
	 */
	public List<String> read_lineList(String txtPath) {
		List<String> lineList = null;
		try {
			lineList = Files.readAllLines(Paths.get(txtPath));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return lineList;
	}
}
