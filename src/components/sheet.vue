<template>
    <br>
    <br>
    <div class="sheet">
      &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
      <button type='button' class="button" id="insert" @click.stop="insert_button"> insert new data </button>
        <div class='mask' v-if="show">
          <h2>insert new data</h2>
          <form id="input_in">
            <p>Ball Handler     <input name="input1"  placeholder="edit me" :value="input1" @change="handle1"></p>
            <br>
            <p>Decison          <input name="input2"  placeholder="edit me" :value="input2" @change="handle2"></p>
            <br>
            <p>Result           <input name="input3"  placeholder="edit me" :value='input3' @change="handle3"></p>
            <br>
            <p>Game Information <input name="input4"  placeholder="edit me" :value='input4' @change="handle4"></p>
            <br>
            <p>Period           <input name="input5"  placeholder="edit me" :value='input5' @change="handle5"></p>
            <br>
            <p>Time             <input name="input6"  placeholder="edit me" :value='input6' @change="handle6"></p>
          </form>
          <br>
          <button type='button' class="button" @click.stop="submit">submit</button> &nbsp
          <button type='button' class="button" @click.stop="close_button">close windows</button>

        </div>
        <grid
            :data="list"
            :columns="gridColumns"
            :filter-key="searchQuery">
        </grid>
    </div>

</template>

<script>
import {Vue} from 'vue'
import grid  from './grid.vue'
import { mapState } from 'vuex'
import insert from './insert.vue'

export default {
  name: 'test',
  props: {
    // msg: String
  },
  components: {
    grid,
    insert
  },
  created(){
    this.$store.dispatch('getlist')
  },
  data() {
    return{
      show :false,
      searchQuery: '',
      gridColumns: ['Ball Handler', 'Decision','Result','Game Information','Period','Time']
      //gridColumns :['name','power'],
      //gridData: []
    }
  },
  computed:{
    ...mapState(['list','input1','input2','input3','input4','input5','input6'])
  },
  methods:{
    handle1: function(e){
        this.$store.commit('setInputValue1',e.target.value)      
    },
    handle2: function(e){
        this.$store.commit('setInputValue2',e.target.value)      
    },
    handle3: function(e){
        this.$store.commit('setInputValue3',e.target.value)      
    },
    handle4: function(e){
        this.$store.commit('setInputValue4',e.target.value)      
    },
    handle5: function(e){
        this.$store.commit('setInputValue5',e.target.value)      
    },
    handle6: function(e){
        this.$store.commit('setInputValue6',e.target.value)      
    },
    insert_button(){
      console.log('fhaofhnak')
      this.show = true
    },
    close_button(){
      console.log('wind')
      this.show = false
    },
    submit(){
      this.$store.commit('addItem')
      //this.data.push(arr)
      this.$store.commit('emptyinput')
      this.show = false
      
    }
  } 
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mask {
  background-color: #ddd;
  opacity: 1;
  position: fixed;
  top: 100px;
  left: 300px;
  width: 50%;
  height: 50%;
  z-index: 1;
  border-style: solid;
  margin: auto;

}
.pop {
  background-color: #fff;
 
  position: fixed;
  top: 100px;
  left: 300px;
  width: calc(100% - 600px);
  height:calc(100% - 200px);
  z-index: 2
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}



.button{
  display: inline-block;
  *display: inline;
  zoom: 1;
  padding: 6px 20px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;
  
  background-color: #ddd;
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,1)), to(rgba(255,255,255,0)));
  background-image: -webkit-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -moz-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -ms-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: -o-linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  background-image: linear-gradient(top, rgba(255,255,255,1), rgba(255,255,255,0));
  
  -webkit-transition: background-color .2s ease-out;
  -moz-transition: background-color .2s ease-out;
  -ms-transition: background-color .2s ease-out;
  -o-transition: background-color .2s ease-out;
  transition: background-color .2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3), 0 2px 2px -1px rgba(0, 0, 0, .5), 0 1px 0 rgba(255, 255, 255, .3) inset;
  text-shadow: 0 1px 0 rgba(255,255,255, .9);
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#insert{
  position: absolute;
  left: 9px;
  top : 130px;
  width: 275px;
  padding: 10px;
}
</style>
