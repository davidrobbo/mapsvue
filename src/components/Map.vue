<template>
    <div>
        <div id="container">
            <div id="over-map">
                <div v-for="(marker, index) in markers">
                    <div :class="[ marker.active ? 'marker-active' : 'marker-inactive', 'btn' ]" @click="changeVis(index)"><img height="16px" :src="marker.icon"> <span style="padding-left:5px;">{{marker.name}}</span> <i :class="[ marker.active ? 'icon-active' : 'icon-inactive', 'fa fa-eye']" aria-hidden="true"></i></div>
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
                      zoom: 14,
                      center: {lat: 51.5, lng: -0.12},
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
                if(icon == "static/i2.png"){
                    marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
                }
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
       margin: 50px 0px 0px 10px;
       border: 5px #444 solid;
       font-family: Arial;
       width: 240px;
        }
#map { width: 100%; height: 100vh }
.btn { padding: 18px 20px; position: relative; }
.btn > img {
    height: 18px;
    position: absolute;
    left: 3%;
}
.btn > i {
    position: absolute;
    right: 3%;
}
.icon-active { color: #fff; }
.icon-inactive { color: #444; }
.marker-active {
        background-color: grey;
        border: 3px #444 solid;
        cursor:pointer;
        color: lightgray;
        }
.marker-inactive {
        background-color: #333;
        border: 3px #444 solid;
        cursor:pointer;
        }
</style>
