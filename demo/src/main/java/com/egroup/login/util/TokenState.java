package com.egroup.login.util;

/**
 * Token Status
* @author 作者 Daniel
* @date 2018年7月11日 下午3:11:00 
* @version 
* @description:
 */
 public enum TokenState { 
	EXPIRED("EXPIRED"),
	INVALID("INVALID"), 
	VALID("VALID");  
	
    private String  state;  
      
    private TokenState(String state) {  
        this.state = state;  
    }
    
    /**
     * get Token status by string
     * @author Daniel 
     * @param tokenState
     * @return
     */
    public TokenState getTokenState(String tokenState){
    	TokenState[] states=TokenState.values();
    	TokenState ts=null;
    	for (TokenState state : states) {
			if(state.toString().equals(tokenState)){
				ts=state;
				break;
			}
		}
    	return ts;
    }
    public String toString() {
    	return this.state;
    }
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
    
}  
