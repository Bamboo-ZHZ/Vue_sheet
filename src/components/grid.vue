<template>
    <div>
        <table id = "search1">
          <tbody>
              <input name="search_input"  placeholder="search the Ball Handler" :value="search_input1" @change="handleInputChange">
              &nbsp
              <button type="button" class="button" @click="search1">Search</button>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th v-for='key in columns'
              @click="sortBy(key)"
              :class="{active: sortKey == key}">
              {{key}}
              <span class="arrow"
                :class="sortOrders[key] >0 ? 'asc' : 'dsc'">
              </span>
              </th>
              <th>
                Operation
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="entry in data | filterBy filterKey | orderBy sortKey sortOrders[sortKey]"> -->
            <tr v-for="(entry,index) in data">
                <td v-for="key in columns" v-if="entry['visable']==true">
                  {{entry[key]}} 
                </td>
                  <td v-if="entry['visable']==true">
                  <button class="button" @click="remove(index)">Remove</button>
                  &nbsp
                  <!-- <button type='button' class="edit_btn" @click="edit(index)">Edit</button> -->
                  </td>
            </tr>
          </tbody>
        </table>
      <div class='mask' v-if="edit_show">
        <h2>Edit data</h2>
        <!-- <form id="input_in">
            <p>Ball Handler  <input name="input1" placeholder="edit me" :value="edit1"></p>
            <br>
            <p>Decison <input name="input2" placeholder="edit me" :value="edit"></p>
            <br>
            <p>Result <input name="input3"  placeholder="edit me" :value='edit3'></p>
            <br>
            <p>Game Information <input name="input4" placeholder="edit me" :value='edit4'></p>
            <br>
            <p>Period <input name="input4"  placeholder="edit me" :value='edit5'></p>
            <br>
            <p>Time <input name="input5"  placeholder="edit me" :value='edit6'></p>
          </form> -->
          <button type='button' class="close_edit_btn" @click="close_edit()"> Exit </button>
      </div>
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { mapState } from 'vuex'
export default {
    name:'grid',
    template:'#grid-template',
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      //sort_re = sort_result();
      var sortOrders = {}
      this.columns.forEach(function (key) {sortOrders[key] = 1})
      return {
        // sort_data: sort_result,
        data_show: this.data,
        edit_show: false,
        //slist: JSON.parse(JSON.stringify(this.data)),
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    methods: {
      handleInputChange: function(e){
        this.$store.commit('setInputValue',e.target.value)
      },
      search1: function(){
          this.$store.commit('search')
      },
      sortBy: function (key) {
        this.sortKey = key // 排序的指标
        var i
        var j
        this.sortOrders[key] = this.sortOrders[key] * -1 // 控制 正序还是逆序
        if(this.sortOrders[key]>0){
          for(i=0;i<this.data.length;i++){
            for(j=1;j<this.data.length;j++){
              if(this.data[j][key] > this.data[j-1][key]){
                var temp = this.data[j]
                this.data[j] = this.data[j-1]
                this.data[j-1] = temp
              }
            }
          }
        }
        else{   
          for(i=0;i<this.data.length;i++){
            // console.log(this.data.length)
            for(j=1;j<this.data.length;j++){
              if(this.data[j][key] < this.data[j-1][key]){
                var temp = this.data[j]
                this.data[j] = this.data[j-1]
                this.data[j-1] = temp
              }
            }
          }
        }
      },
      sort_result: function(){
        return this.data
      },
      // setSlist(arr){
      //   this.slist = JSON.parse(JSON.stringify(arr));
      // }
      remove: function(index){
        this.data.splice(index,1)
      },
      edit: function(index){
        this.edit_show = true
      },
      close_edit: function(){
        this.edit_show = false
      },

    },
    computed:{
      ...mapState(['search_input1','visable'])
    }
}
</script>


<style scoped>
.mask {
  background-color: #fff;
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
a {
  color: #42b983;
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

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

#search {
  margin-bottom: 10px;
}
#search1{
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
  table-layout:fixed;
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




</style>
