<template>
<div class="article-center animated zoomIn">
    <div id="article-profile">
            <Form ref="formValidate"  :rules="ruleValidate" :label-width="80">
                            <FormItem label="标题" prop="articletitle">
                                <Input v-model="articleTitle" placeholder="Enter the article title"></Input>
                            </FormItem>
                            <FormItem label="作者" prop="author">
                                <Input v-model="author" placeholder="Who's the author ?"></Input>
                            </FormItem>
                            <FormItem label="城市" prop="city">
                                <Select v-model="city" placeholder="Select your city">
                                    <Option value="beijing">Guangyuan</Option>
                                    <Option value="shanghai">Suzhou</Option>
                                    <Option value="shenzhen">Shanghai</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="时间">
                                <Row>
                                    <Col span="11">
                                        <FormItem prop="date">
                                            <DatePicker type="date" placeholder="Select date" v-model="date"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="11">
                                        <FormItem prop="time">
                                            <TimePicker type="time" placeholder="Select time" v-model="time"></TimePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem label="类别" prop="articletype">
                                <RadioGroup v-model="articleType">
                                    <Radio label="Vue"></Radio>
                                    <Radio label="React"></Radio>
                                    <Radio label="Angular"></Radio>
                                    <Radio label="Js"></Radio>
                                    <Radio label="css"></Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="点赞">
                                 <Row>
                                    <Col span="11">
                                        <FormItem prop="stars">
                                             <Input v-model="starsNum" placeholder="initial stars num 0"></Input>
                                        </FormItem>
                                    </Col>
                                 </Row>
                            </FormItem>
                            <FormItem label="浏览">
                                <Row>
                                    <Col span="11">
                                        <FormItem prop="views">
                                                <Input v-model="views" placeholder="initial views 0 "></Input>
                                        </FormItem>
                                    </Col>
                            </Row>
                            </FormItem>
                            <FormItem label="其他描述" prop="desc">
                                <Input v-model="desc" type="textarea" :autosize="{minRows: 5,maxRows: 9}" placeholder="Enter something..."></Input>
                            </FormItem>
            </Form>
    </div>
    <div id="editor-core">
        <div id="editor">
                <editor
                        api-key="zz6kufduyz69ewv614r0rudtr2snd9pr3bzyeignjc1tgn5e"
                        output-format="html"
                        v-model="content"
                        onChange="contentChanged"
                        @onSelectionChange="contentInputChanged"
                        :init="{
                            height: 600,
                            menubar: false,
                            image_list: [
                            
                            ],
                            plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount emoticons'
                            ],
                            toolbar:
                            'undo redo | formatselect | bold italic forecolor backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            table l \
                            link code |\
                            bullist numlist emoticons image outdent indent | removeformat | help'
                        }"
                />
        </div>
    <div class="submit_reset_btn">
            <Button type="success" size="large" @click="submitArticle">点击提交</Button>
            <Button type="error" size="large" @click="reseTextInputtingBox">重置输入框</Button>
    </div>
  </div>

</div>



</template>

<script>
 import Editor from '@tinymce/tinymce-vue'

export default {
  name: '',
  data () {
    return {
        articleTitle : '' , 
        articleType : '' ,
        content : '',
        author : '',
        createDate : '' ,
        starsNum : '',
        views : '',
        city: '',
        date: '',
        time: '',
        desc: '',
        ruleValidate: {
            articletitle: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            articletype: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            author: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            city: [
                { required: true, message: 'Please select the city', trigger: 'change' }
            ],
            date: [
                { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
            ],
            time: [
                { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
            ],
            desc: [
                { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
            ]
        }
    }
  },
  components:{
        editor: Editor
  },
  methods:{
      contentInputChanged(){
          console.log(this.content)
      },
      contentChanged(){

      },
      submitArticle(){
        //   this.createDate = this.date.toString().replace(/00:00:00/g,this.time)
        //   console.log(createDate)
        let articleTitle = this.articleTitle
        let articleType = this.articleType
        let content = this.content
        let author = this.author
        let createDate = this.date.toString().replace(/00:00:00/g,this.time)
        let starsNum = this.starsNum
        let views = this.views
        console.log(articleTitle,articleType, content, author, createDate, starsNum, views)
        if(articleTitle && articleType && content && author && createDate && starsNum &&views){
             this.$axios.post('/api/add_article',{ articleTitle,articleType, content, author, createDate, starsNum, views }).then(res => {
                 if(res.data.status == "true"){
                            this.articleTitle = ''
                            this.articleType = ''
                            this.content = ''
                            this.author = ''
                            this.createDate = ''
                            this.starsNum = ''
                            this.views = ''
                            this.date = ''
                            this.time = ''
                            this.$Message.success('uploaded the article content to Mongodb sucessfully !!');
                 }
             }).catch(err => {

             })
        }else{
            console.log("submit failed")
        }
        

        
      },
      reseTextInputtingBox(){
          
      },
      handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
       handleReset (name) {
            this.$refs[name].resetFields();
       }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@media only screen and (min-width:540px){

.article-center{

    #article-profile{
        width: 28%;
        padding: 1rem 0 0 1rem;
        float: left;
        // font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
    }
    #editor-core{
        width: 70%;
        float: right;
        #editor{
            margin: 1rem 1rem 1rem 0;
        }
        .submit_reset_btn{
            font-size: 0.8rem;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
        }
    }
   
}

}
</style>
