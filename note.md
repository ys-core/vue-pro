

具名插槽在父组件中调用时:
<custom-list>
    <template v-slot:title>
      <span><icon type="waves"> 书籍列表</span>
    <template>
    <template v-slot:content>
      <div>
        <div v-for="(item, i) in book" :key="i">
          <icon :type="item.icon">{{ item.name }}
        </div>
      </div>
    </template>
</custom-list>

作用域插槽: 模板虽然是在父级作用域中渲染的,却能拿到子组件的数据,即允许将子组件的数据传给父组件



<div id="container">
     
<div id="center-warpper">
      
<div class="center">#center</div>
    
</div>
    
<div id="left">#left</div>
    
<div id="right">#right</div>

</div>




#container {
      overflow: hidden;
}
#left, #right, #center-warpper {
      float: left;
}
#center-warpper {         
      width: 100%; 
}
#left { 
      width: 200px
      height: 600px; 
      margin-left: -100%;
      background: purple;
}
#right {
      width: 150px; 
      height: 350px;
      margin-left: -150px;   
      background: red;
}
.center {  
      height: 300px;
      background: green;
      margin: 0 150px 0 200px;
}





