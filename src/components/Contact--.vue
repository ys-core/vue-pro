<template>
  <div class="contact">
     
     <editor
       api-key="zz6kufduyz69ewv614r0rudtr2snd9pr3bzyeignjc1tgn5e"
       output-format="html"
       v-model="inputs"
       onChange="contentChanged"
       @onSelectionChange="contentChanged"
       :init="{
         height: 600,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount emoticons'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist emoticons outdent indent | removeformat | help'
       }"
     />
  

  </div>
</template>

<script>
 import Editor from '@tinymce/tinymce-vue'

export default {
  name: '',
  data () {
    return {
      inputs: '想说点什么呢?'
    }
  },
 components:{
        editor: Editor
  },
  methods:{
      contentChanged(){
          console.log(this.inputs)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contact{
    width: 65%;
    margin: 0 auto;
}
</style>
