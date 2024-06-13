<template>
    <div class="ad_head">
        <h1 v-if="getUser() == 'admin'">Bienvenue à Admin ProxyDC</h1>
        <h1 v-else>Bienvenue à l'utilisateur ProxyDC</h1>
    </div>
</template>

<script>

export default {
    name: 'AdminHeader',
    methods:
    {
        getUser(){
            return localStorage.getItem('useraccount')
        }
    }
}

</script>

<style>
.ad_head {
    border-bottom: solid 1px black;
}
</style>