<template>
    <div>
        <Navbar :name="name"/>
        <h4>Dashboard</h4>
    </div>
</template>
<script>
    import Navbar from './Navbar.vue'
    import store from './../store'
    export default {
        data(){
            return{
                name: null
            }
        },
        components:{
            Navbar
        },
        mounted(){
            this.name = store.getters.getUserdata.name
        }
    }
</script>