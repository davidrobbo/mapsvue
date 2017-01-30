<template>
    <div id="map"></div>
    <script>
      function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
    </script>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
            
            }
        },
        computed: {        
        },
        methods: {
        },
        mounted() {
        },
        created(){
        }     
    }
</script>
<style>
</style>
