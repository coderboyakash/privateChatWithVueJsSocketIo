<template>10 p-0">
    <div class="row chat-room">10 p-0">

    </div>
    <div class="row">
        <div class="col-10 p-0">
            <input type='text' v-on:keyup='handleInputKeyUp' class='form-control' />
        </div>
        <div class="col-2 p-0">
            <input type="submit" @click='handleSendMessage' value="Submit" class="btn btn-dark submit-btn" />
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                message:null
            }
        },
        methods:{
            handleSendMessage(){
                
            },
            handleInputKeyUp(e){
                if(e.keyCode == 13){
                    this.handleSendMessage()
                }
            }
        }
    }
</script>
<style scoped>
    .chat-room{
        height:500px;
        background-color: powderblue;
    }
    .submit-btn{
        width:90%;
    }
    .form-control{
        padding: 1rem .75rem;
    }
    .btn{
        padding: 1rem .75rem;
    }
</style>