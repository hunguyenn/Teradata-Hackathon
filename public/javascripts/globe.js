var width = window.innerWidth;
var height = window.innerHeight - 140;
var time = Date.now();
var rotate = [0, 0];
var velocity = [.015, -0];

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// sphere 
svg.append("path")
    .datum({
        type: "Sphere"
    })
    .attr("class", "sphere")
    .attr("d", path);

d3.json("world-110m.json", function(error, world) {
    if (error) {
        throw error;
    }

    svg.append("path")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
            return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);

    path.pointRadius(2.6);

    spin_the_globe();
});

function spin_the_globe() {
    d3.timer(function() {
        var dt = Date.now() - time;
        projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1]]);
        svg.selectAll("path.land").attr("d", path);
        svg.selectAll("path.boundary").attr("d", path);
        // svg.selectAll("path.cities").attr("d", path);
        svg.selectAll("path.source").attr("d", path);
    });
}

