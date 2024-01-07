import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState={
  error:"",
  status:"",
  loading:false,
  news_data:"",
  news_details:"",
  message:"",
}
export const searchNews = createAsyncThunk(
  "search,searchNews",
  async () => {
    //console.log('I am in search news')
    const resData = await axios.get(
      " https://newsapi.org/v2/everything?q=tesla&from=2023-11-20&sortBy=publishedAt&apiKey=2b6199615659423992b01b12ad545694",
      {
        header: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return resData.data.articles;
  }
);

const newsSlice =createSlice({
  name:"news",
  initialState,
  reducer:{
     clearState:(state)=>{
      state.error="";
      state.news_message="";
     }   
  },
  extraReducers:(builder)=>{
    builder.addCase(searchNews.pending ,(state)=>{
        console.log("Loading................")
        state.loading=true
    })
    .addCase(searchNews.fulfilled ,(state ,{payload})=>{
      console.log("fullfield....................")
      console.log(payload)
      state.loading=false;
      //console.log("fulfilled", payload);
      state.news_data = payload;
      //console.log('news',state.news_data)
    })
    .addCase(searchNews.rejected,(state ,{payload})=>{
      console.log("rejected...................")
      console.log("this is error", payload);
      console.log("request rejected");
    })
  }
})
export default newsSlice.reducer;
export const { clearState } = newsSlice.actions;