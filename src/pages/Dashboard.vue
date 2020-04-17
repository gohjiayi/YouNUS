<template>
    <div id="main">
        <div id="chart">
            <taxi></taxi>

        </div>
    </div>
</template>

<script>
import Transportation from './Dashboard/Transportation.js'

export default {
    components:{
        Transportation
    }
    
}
</script>

<style scoped>
#main{
    content:"";
    display:table;
    clear:both;
}
#chart{
  height:240px;
  width:300px;
  border-style: solid;
  border-color:rgb(155, 84, 84);
  border-width: 1px;
  padding-bottom: 60px;
  float:left;
}
</style>