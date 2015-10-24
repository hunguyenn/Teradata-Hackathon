$('select').on('change', function() {
  alert( this.value ); // or $(this).val()
});

$(document).on('ready', function () {

    var width = window.innerWidth;
    var height = window.innerHeight - 140;
    var time = Date.now();
    var rotate = [0, 0];
    var velocity = [.015, -0];

    // $.ajax({
    //     type: "POST",
    //     url: "http://dragon.teradata.ws:1080/tdrest/systems/xTD150/queries",
    //     contentType: "application/json",
    //     headers: {
    //         'Accept': "application/vnd.com.teradata.rest-v1.0+json",
    //         'Authorization': 'Basic ' + btoa('hack_user07:tdhackathon')
    //     },
    //     data: JSON.stringify({
    //         query: "SELECT * FROM homeland_security.refugee_arrivals_by_country",
    //         format: 'object'
    //     })

    // }).done(function(data) {
    //     console.log(JSON.stringify(data));
    // })

    // var refugee_data = JSON.parse("refugees-by-country.json");
    // console.log(refugee_data);


    d3.json("refugees-by-country.json",function(error, data) {
        var countries = {};
        data_ = data['results'][0]['data'];
        // console.log(data_[0])

        for(var i = 0; i < data_.length; i++) {
            for(var key in data_[i]) {
                if(data_[i][key] != null) {
                    countries[key] = 0;
                }
            }
        }

        for(var i = 0; i < data_.length; i++) {
            for(var key in data_[i]) {
                if(data_[i][key] != null) {
                    countries[key] += data_[i][key];
                }
            }
        }

        console.log(countries);
        // for(var i = 0; i < data_.length; i++) {
        //     for(var j = 0; j < Object.keys(countries[data_[i]]).length; j++) {
        //         countries[data_[i][j]] = true;
        //     }
        // }
        var keys = [];
        for(var key in countries) {
            if(key != "Date" && key != "Total" && key != "All Other Countries") { 
                keys.push(key);
            }
        }
        // console.log(keys);

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
        .datum({type: "Sphere"})
        .attr("class", "sphere")
        .attr("d", path);

    var countryTooltip = d3.select("body").append("div").attr("class", "countryTooltip"),
  countryList = d3.select("body").append("select").attr("name", "countries");

    

    d3.json("world-110m.json", function(error, world) {
        if (error) {
            throw error;
        }

        keys.forEach(function(country) {
            option = countryList.append("option");
            option.text(country);
            option.property("value", country);
        })

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

            //Country focus on option select

    d3.select("countries").on("change", function() {
      // var rotate = projection.rotate(),
      // focusedCountry = country(countries, this),
      // p = d3.geo.centroid(focusedCountry);
        console.log("ASDASF");


    //   svg.selectAll(".focused").classed("focused", focused = false);

    // Globe rotating

    //  (function transition() {
    //   d3.transition()
    //   .duration(2500)
    //   .tween("rotate", function() {
    //     var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
    //     return function(t) {
    //       projection.rotate(r(t));
    //       svg.selectAll("path").attr("d", path)
    //       .classed("focused", function(d, i) { return d == focusedCountry ? focused = d : false; });
    //     };
    //   })
    //   })();
    });

         spin_the_globe();
    });

    function spin_the_globe() {
        d3.timer(function() {
            var dt = Date.now() - time;
            projection.rotate([rotate[0] + velocity[0] * dt, rotate[1] + velocity[1]]);
            svg.selectAll("path.land").attr("d", path);
            svg.selectAll("path.boundary").attr("d", path);
            svg.selectAll("path.source").attr("d", path);
        });
    }
});

 });