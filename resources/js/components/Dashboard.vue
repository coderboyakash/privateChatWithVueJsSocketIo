<template>
    <div>
        <Navbar :name="name"/>
        <h4>Dashboard</h4>
    </div>
</template>
<script>
    import Navbar from './Navbar.vue'
    import { mapGetters } from 'vuex'
    export default {
        data(){
            return{
                name: null
            }
        },
        components:{
            Navbar
        },
        computed:{
            ...mapGetters([
                'getUserData',
            ])
        },
        mounted(){
            this.name = this.$store.getters.getUserName
        }
    }
</script>