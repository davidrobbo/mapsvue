<template>
    <div>
        <button v-for="(marker, index) in markers" @click="changeVis(index)">{{marker.name}}</button>
        <div id="map">
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Event from '../Event.js'
    export default {
        name: '',
        data() {
            return {
                map: {},
                geo: {
                    test: [
                        {lat: 52, lng:2},
                        {lat: 52, lng:2.2},
                    ],
                    another: [
                        {lat: 55, lng:4},
                        {lat: 56, lng:4.2},
                    ]
                },
                markers: []
            }
        },
        computed: {        
        },
        methods: {
            loadMap(){
                this.map = new google.maps.Map(document.getElementById('map'), {
                      zoom: 12,
                      center: {lat: 52, lng: 2},
                      mapTypeId: 'terrain'
                    });
                this.addMarkers();
            },
            addMarkers(){
                let count = 1;
                for(let group in this.geo){
                    if(!this.markers.hasOwnProperty(group)){
                        this.markers.push({name: group, markers: [], active: true, id:count});
                        this.geo[group].forEach((mark) =>{
                            this.addMarker(mark, count);
                        });
                        count++;
                    }
                }
            },
            addMarker(location, id) {
                var marker = new google.maps.Marker({
                  position: location,
                  map: this.map
                });
                this.markers.forEach(function(mark){
                    if (mark.id == id){
                        mark.markers.push(marker)
                    }
                });
            },
            changeVis(index){
                let vis = this.markers[index].active = this.markers[index].active ? null : this.map;
                this.markers[index].markers.forEach(function(mark){
                    mark.setMap(vis);
                });
            }
        },
        mounted() {
            Event.$on('loadMap', () => {
                this.loadMap();
            })
        },
        created(){
        }     
    }
</script>
<style>
    #map {
      height: 400px;
      width: 100%;
    }
</style>
