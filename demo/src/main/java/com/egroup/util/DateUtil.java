package com.egroup.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {
	public enum Formate {
		YMDTHMSZ_("yyyy-MM-dd'T'HH:mm:ssZ"),YMDTHMS_("yyyy-MM-dd'T'HH:mm:ss"),YMDHMS_("yyyy-MM-ddHH:mm:ss"), YMD_SPACE_HMS_("yyyy-MM-dd HH:mm:ss"),YMD_("yyyy-MM-dd"), YMD("yyyy/MM/dd");

		private String value;

		Formate(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}
	}

	public enum Formula {
		PLUS("Plus"), MINUS("Minus");

		private String value;

		Formula(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}
	}

	public enum Category {
		DAYS("Days"), MONTHS("Months"), YEARS("Years");
		private String value;

		Category(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}
	}
	
	public enum Compare {
		BEFORE("before"), AFTER("after"), EQUALS("equals");
		private String value;

		Compare(String value) {
			this.value = value;
		}

		public String getValue() {
			return value;
		}
	}

	// init func
	final AttributeCheck attributeCheck = new AttributeCheck();


	public static void main(String args[]){
		// GetDate
//		System.out.println("getDateString="+getDateString(Formate.YMDHMSSSS_));
		// TransferFomate
//		System.out.println("getDateStringTransfer="+getDateStringTransfer_localDateTime(Formate.YMDHMSSSS_,Formate.YMDHMS_, getDateString(Formate.YMDHMSSSS_)));
//		// Get Date 
//		Long digital = new Long(5);
//		getDateString_calculate(Formate.YMDTHMS_,Category.DAYS,Formula.PLUS,digital);
//		// Compare Date
//		getDateString_compare(Formate.YMDTHMS_,Compare.AFTER,"2018-08-28T12:16:01","2018-08-25T12:16:01");
	}
	
	public  String getDateString(Formate formate) {
		final ZoneId zoneId = ZoneId.of("Asia/Taipei");
		final ZonedDateTime zonedDateTime = ZonedDateTime.now(zoneId);
		final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
		return zonedDateTime.format(formatter);
	}
	
	public  String getDateStringTransfer_zoneTime(Formate formateInput,Formate formateOutput,String dateString) {
		if(attributeCheck.stringsNotNull(dateString)){
			final DateTimeFormatter formatterInput = DateTimeFormatter.ofPattern(formateInput.getValue());
			final DateTimeFormatter formatterOuptut = DateTimeFormatter.ofPattern(formateOutput.getValue());
			final ZonedDateTime zonedDateTime = ZonedDateTime.parse(dateString, formatterInput);
			return zonedDateTime.format(formatterOuptut);
		}
		return null;
	}
	
	public  String getDateStringTransfer_localDateTime(Formate formateInput,Formate formateOutput,String dateString) {
		if(attributeCheck.stringsNotNull(dateString)){
			final DateTimeFormatter formatterInput = DateTimeFormatter.ofPattern(formateInput.getValue());
			final DateTimeFormatter formatterOuptut = DateTimeFormatter.ofPattern(formateOutput.getValue());
			final LocalDateTime localDateTime = LocalDateTime.parse(dateString, formatterInput);
			return localDateTime.format(formatterOuptut);
		}
		return null;
	}
	
	public  boolean getDateString_compare2Date(Formate formate,Compare compare,String dateString1,String dateString2){
		boolean flag = false;
		if(attributeCheck.stringsNotNull(dateString1,dateString2)){
			final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
			final LocalDateTime localDateTime1 = LocalDateTime.parse(dateString1, formatter);
			final LocalDateTime localDateTime2 = LocalDateTime.parse(dateString2, formatter);	
			switch (compare.getValue()) {
			case "before":
				flag = localDateTime1.isBefore(localDateTime2);
				break;
			case "after":
				flag = localDateTime1.isAfter(localDateTime2);
				break;
			case "equals":
				flag = localDateTime1.equals(localDateTime2);
				break;
			default:
				break;
			}
		}
		return flag;
	}
	
	public boolean getDateString_nowCompareWith(Formate formate,Compare compare,String dateString){
		boolean flag = false;
		if(attributeCheck.stringsNotNull(dateString)){
			final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
			final LocalDateTime localDateTime1 = LocalDateTime.now();
			final LocalDateTime localDateTime2 = LocalDateTime.parse(dateString, formatter);
			if(compare.getValue().equals("before")){
				flag = localDateTime1.isBefore(localDateTime2);
			}else{
				flag = localDateTime1.isAfter(localDateTime2);
			}
		}
		return flag;
	}

	
	public String getDateString_calculate(String startDateString,Formate formate,Category category,Formula formula,Long digital){
		String dateString = "";
		if(attributeCheck.stringsNotNull(startDateString)){
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
			ZonedDateTime zonedDateTime_now = ZonedDateTime.parse(startDateString, formatter);
			System.out.println("zonedDateTime_now="+zonedDateTime_now.format(formatter));
			
			switch (category.getValue()) {
			case "Days":
				dateString = caculateDays(zonedDateTime_now, formula, formate, digital);
				break;
			case "Months":
				dateString = caculateMonths(zonedDateTime_now, formula, formate, digital);	
				break;
			case "Years":
				dateString = caculateYears(zonedDateTime_now, formula, formate, digital);	
				break;

			default:
				break;
			}
			System.out.println("dateString="+dateString);
		}
		return dateString;
	}

	public  String getDateString_calculate(Formate formate,Category category,Formula formula,Long digital){
		final ZoneId zoneId = ZoneId.of("Asia/Taipei");
		final ZonedDateTime zonedDateTime_now = ZonedDateTime.now(zoneId);
		final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
		System.out.println("zonedDateTime_now="+zonedDateTime_now.format(formatter));
		
		String dateString = "";
		switch (category.getValue()) {
		case "Days":
			dateString = caculateDays(zonedDateTime_now, formula, formate, digital);
			break;
		case "Months":
			dateString = caculateMonths(zonedDateTime_now, formula, formate, digital);	
			break;
		case "Years":
			dateString = caculateYears(zonedDateTime_now, formula, formate, digital);	
			break;

		default:
			break;
		}
		System.out.println("dateString="+dateString);
		return dateString;
	}

	private  String caculateDays(ZonedDateTime zonedDateTime_now,Formula formula,Formate formate,Long digital) {
		if(zonedDateTime_now!=null){
			ZonedDateTime zonedDateTime_result =null;
			switch (formula.getValue()) {
			case "Plus":
				zonedDateTime_result = zonedDateTime_now.plusDays(digital);		
				break;
			case "Minus":
				zonedDateTime_result = zonedDateTime_now.minusDays(digital);				
				break;
			default:
				break;
			}
			final  DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
			return zonedDateTime_result.format(formatter);
		}
		return null;
	}
	
	private  String caculateMonths(ZonedDateTime zonedDateTime_now,Formula formula,Formate formate,Long digital) {
		if(zonedDateTime_now!=null){
			ZonedDateTime zonedDateTime_result =null;
			switch (formula.getValue()) {
			case "Plus":
				zonedDateTime_result = zonedDateTime_now.plusMonths(digital);		
				break;
			case "Minus":
				zonedDateTime_result = zonedDateTime_now.minusMonths(digital);				
				break;
			default:
				break;
			}
			final  DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
			return zonedDateTime_result.format(formatter);
		}
		return null;
	}
	
	private  String caculateYears(ZonedDateTime zonedDateTime_now,Formula formula,Formate formate,Long digital) {
		if(zonedDateTime_now!=null){
			ZonedDateTime zonedDateTime_result =null;
			switch (formula.getValue()) {
			case "Plus":
				zonedDateTime_result = zonedDateTime_now.plusYears(digital);		
				break;
			case "Minus":
				zonedDateTime_result = zonedDateTime_now.minusYears(digital);				
				break;
			default:
				break;
			}
			final  DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formate.getValue());
			return zonedDateTime_result.format(formatter);
		}
		return null;
	}
}