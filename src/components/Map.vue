<template>
    <div>
        <div id="container">
            <div id="over-map">
                <div v-for="(marker, index) in markers">
                    <button @click="changeVis(index)">{{marker.name}} <img :src="marker.icon"></button>
                </div>
            </div>
            <div id="map">
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Event from '../Event.js'
    import mapStyles from '../map-styles.js'
    import markers from '../markers.js'
    export default {
        name: '',
        data() {
            return {
                map: {},
                geo: markers,
                markers: []
            }
        },
        computed: {        
        },
        methods: {
            loadMap(){
                this.map = new google.maps.Map(document.getElementById('map'), {
                      zoom: 6,
                      center: {lat: 52, lng: 2},
                      styles: mapStyles
                    });
                this.addMarkers();
            },
            addMarkers(){
                let count = 1;
                for(let group in this.geo){
                    if(!this.markers.hasOwnProperty(group)){
                        this.markers.push({name: this.geo[group].name, markers: [], active: true, id:count, icon: this.geo[group].icon});
                        this.geo[group].offices.forEach((mark) =>{
                            this.addMarker(mark, count, this.geo[group].icon);
                        });
                        count++;
                    }
                }
            },
            addMarker(location, id, icon) {
                var marker = new google.maps.Marker({
                  position: location,
                  map: this.map,
                  icon: icon
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

#container { width: 100%; height: 100% }

#over-map { z-index: 100; position: absolute;
       margin: 50px 0px 0px 10px; background-color: #fff;
       border: 1px #000 Solid; padding: 5px; }
#map { width: 100%; height: 500px }
</style>
