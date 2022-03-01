import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    // all data
    list:[],
    // input
    input1:"",
    input2:"",
    input3:"",
    input4:"",
    input5:"",
    input6:"",
    visable: true,
    input:{},
    search_input1:""
  },
  getters: {
  },
  mutations: {
    emptyinput(state){
      state.input1=""
      state.input2=""
      state.input3=""
      state.input4=""
      state.input5=""
      state.input6=""
    },
    initlist(state,list){
      state.list = list
      var i
      for(i=0;i<list.length;i++){
        state.list[i]["visable"] = true
      } 
      console.log(state.list)
    },
    // {"Ball Handler": "LeB", "Decision": "Pass", "Result": "Miss 2PT", "Game Information":"2015","Period":"3","Time":"06:32"}
    addItem(state){
      state.input = {"Ball Handler":state.input1,"Decision":state.input2,"Result":state.input3,"Game Information":state.input4,"Period":state.input5,"Time":state.input6,"visable":state.visable}
      state.list.push(state.input);
      console.log(state.list)
    },
    search(state){
      if(state.search_input1!=''){
        var i
        for(i=0;i<state.list.length;i++){
          if(state.list[i]["Ball Handler"].indexOf(state.search_input1)<0){
            state.list[i]["visable"] = false
          }
          else{
            state.list[i]["visable"] = true
          }
        }
      }
      else{
        for(i=0;i<state.list.length;i++){
          // console.log(state.list[i][0])
          state.list[i]["visable"] = true
        }
      }
    },
    setInputValue(state,val){
      state.search_input1 = val
    },
    setInputValue1(state,val){
      state.input1 = val
    },
    setInputValue2(state,val){
      state.input2 = val
    },
    setInputValue3(state,val){
      state.input3 = val
    },
    setInputValue4(state,val){
      state.input4 = val
    },
    setInputValue5(state,val){
      state.input5 = val
    },
    setInputValue6(state,val){
      state.input6 = val
    },
  },
  actions: {
    getlist(context){
      axios.get('/list.json').then(({data}) =>{
        context.commit('initlist',data)
      })
    }
  },
  modules: {
  }
})
