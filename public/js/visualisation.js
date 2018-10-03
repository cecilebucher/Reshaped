var radius_miniCircle = 2;
var radius_circle = 4;
var radius_circle_outside = 8;
var nb_rect = 7;
var gap_rect = 6;
var step_x = 8;
var h_rect = 800;
//var w_rect = step_x * 30;
var x_min = 0;
//var x_max = nb_rect*w_rect + (nb_rect-1)*gap_rect,gap_rect;
var y_min = 0;
var y_max = y_min + h_rect;
var x = x_min;
var y_middle = h_rect * 0.5 + y_min;

var offset_x_popup = 0;
// var offset_y_popup = -90;
var offset_y_popup = -100;

var padding_panel_x = 180 + 30;
var padding_panel_y = 49 + 40;


var circles = [];

var designer_points2 = [

    {
        day: "1", // from 0 to 6
        vertical_line: "3", // from 0 to 29
        perc: "0.35",
        text_firstline: "01.03.2018. Shaped",
        text_secondline: "Style: Contrast 20%; Font:Times; H1: 23pt",
    },

]

function getViz(id) {
    for (viz of designer_points) {
        if (viz.id != undefined && viz.id == id) {
            return viz;
        }
    }
    return undefined;
}

function drawCircle(line, perc, viz) {
    var x = x_min + line * step_x;
    var y = y_middle - perc * (h_rect * 0.5);

    var circle = new paper.Path.Circle(new paper.Point(x, y), radius_circle);
    circle.fillColor = 'white';
    circle.opacity = 0.8;
    var greenCircle = new paper.Path.Circle(new paper.Point(x, y), radius_miniCircle);
    greenCircle.fillColor = '#087208';
    greenCircle.opacity = 0.0;
    //console.log("circle id",circle.id);
    var circle_outside = new paper.Path.Circle({
        center: new paper.Point(x, y),
        radius: radius_circle_outside,
        fillColor: 'white'
    });
    //circle_outside.fillColor = 'red';
    circle_outside.opacity = 0.01;
    //console.log("circle id",circle_outside.id);

    if(viz != undefined){
        viz.id = circle_outside.id;
        viz.circle = circle;
        viz.greenCircle = greenCircle;
    }

    // When the mouse enters the item, set its fill color to red:
    circle_outside.onMouseEnter = function (event) {
        //this.opacity = 1.0;
        //console.log("yup",$("#point-popup"));
        //console.log("******");
        //console.log("on mouse enter", this.id);
        //console.log("on mouse enter", circle_outside.id);
        var id = circle_outside.id;
        var viz = getViz(id);
        if (viz != undefined) {
            $("#point-popup").show();
            $("#point-popup").css("top", this.position.y + offset_y_popup + padding_panel_y);
            $("#point-popup").css("left", this.position.x + offset_x_popup + padding_panel_x);
            if (viz.text_firstline != undefined) {
                $("#point-popup p.firstline").text(viz.text_firstline);
            }
            if (viz.text_secondline != undefined) {
                $("#point-popup p.secondline").text(viz.text_secondline);
            }
            viz.circle.opacity = 1.0;
            viz.greenCircle.opacity = 1.0;
            //$("#point-popup").css("width","400px");
            //$("#point-popup").css("height","5px");
        }
    }

    // When the mouse leaves the item, set its fill color to black:
    circle_outside.onMouseLeave = function (event) {
        //this.opacity = 0.8;
        //console.log("on mouse leave",this.id);
        //console.log("on mouse leave",circle_outside.id);
        //console.log("******");
        var id = circle_outside.id;
        var viz = getViz(id);
        if (viz != undefined) {
            viz.circle.opacity = 0.8;
            viz.greenCircle.opacity = 0.0;
        }
        $("#point-popup").hide();
    }

    //return circle_outside.id;
}


function initCanvas() {

    window.addEventListener('resize', resizeCanvas, false);
}


function loadBackground() {

    //console.log("load background");
    // Get a reference to the canvas object
    var canvas = document.getElementById('rdatas');

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    var gap_rect = 8;
    var h_rect = 920; // 830 pour 1080 
    var w_rect_0 = step_x * 30;
    var w_rect_1 = step_x * 28;
    var w_rect_2 = step_x * 30;
    var w_rect_3 = step_x * 29;
    var w_rect_4 = step_x * 30;
    var w_rect_5 = step_x * 29;
    var w_rect_6 = step_x * 30;

    var rects = [w_rect_0, w_rect_1, w_rect_2, w_rect_3, w_rect_4, w_rect_5, w_rect_6];
    var x_min = 0;
    //var x_max = nb_rect*w_rect + (nb_rect-1)*gap_rect,gap_rect;
    var x_max = (nb_rect - 1) * gap_rect;
    var y_min = 0;
    var y_max = y_min + h_rect;
    var x = x_min;
    var y_middle = h_rect * 0.5 + y_min;

    // drawing big green rectangles
    for (var i = 0; i < nb_rect; i++) {
        var rect = new paper.Rectangle(x, y_min, rects[i], h_rect);
        var path = new paper.Path.Rectangle(rect);
        if (i % 2 == 0)
            path.fillColor = '#18b118';
        else
            path.fillColor = '#3dbe3d';
        path.opacity = 0.7;
        x += rects[i] + gap_rect;
        x_max += rects[i];
    }

    // rectangle in the middle
    var rect = new paper.Rectangle(x_min, y_middle - gap_rect * 0.5, x_min + x_max, gap_rect);
    var path = new paper.Path.Rectangle(rect);
    path.fillColor = '#0e930e';
    path.opacity = 0.7;

    // drawing horizontal white lines
    var percentages = [0.15, 0.35, 0.6, 0.9];
    for (var k = 0; k < 2; k++) {
        for (var i = 0; i < percentages.length; i++) {
            var path = new paper.Path();
            path.strokeColor = 'white';
            path.opacity = 1.0;
            if (k == 0) var y = y_middle - percentages[i] * (h_rect * 0.5);
            else var y = y_middle + percentages[i] * (h_rect * 0.5);
            var start = new paper.Point(x_min, y);
            var end = new paper.Point(x_max, y);
            path.moveTo(start);
            path.lineTo(end);
        }
    }

    // drawing vertical white lines
    var x_abs = x_min;
    for (var k = 0; k < nb_rect; k++) {
        x = 0;
        for (var x = 0; x <= rects[k]; x += step_x) {
            var path = new paper.Path();
            path.strokeColor = 'white';
            path.opacity = 0.6;
            var start = new paper.Point(x_abs + x, y_min);
            var end = new paper.Point(x_abs + x, y_max);

            path.moveTo(start);
            path.lineTo(end);
        }
        x_abs += (rects[k] + gap_rect);
    }

    // Draw the view now:
    paper.view.draw();
    resizeCanvas(x_max,h_rect);
}

function loadRpoints() {

    // retrieve informations from the database and draw the white cicles
    var nb_vertical_lines = 0;
    var pt = 0;
    //var days = [0,30,58,88,117,147,176];
    var days = [0, 31, 60, 91, 121, 152, 182];
    for (viz of designer_points) {
        var nb_vertical_lines = days[viz.day-1];
        var vert_line = parseInt(nb_vertical_lines) + parseInt(viz.vertical_line);
        // var id = drawCircle(parseInt(vert_line), viz.perc, viz);
        drawCircle(parseInt(vert_line), viz.perc, viz);
        //viz.id = id;
        pt++;
        //console.log("point:", "day", viz.day - 1, "vert line", viz.vertical_line, "total revious lines", nb_vertical_lines, "final line", vert_line);
    }
    //console.log("nb points",pt);

    //drawCircle(20,-0.25);
    //drawCircle(10,-0.75);
    //drawCircle(35,0.1);

}

function loadRviz() {

    // retrieve informations from the database and draw the white cicles
    drawCircle(-500,0.0, undefined);
    //drawCircle(10,0.1);
    //drawCircle(35,0.35);

}


function resizeCanvas(w,h) {
    htmlCanvas = document.getElementById('rdatas')
    htmlCanvas.width = window.innerWidth;
    //htmlCanvas.width = w;
    //htmlCanvas.height = window.innerHeight;
    htmlCanvas.height = window.innerHeight+60;
    // paper.view.draw();
}



window.onload = function () {
    // see user-settings
}