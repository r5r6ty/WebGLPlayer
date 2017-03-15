
window.onload = function()
{
    var c = document.getElementById("canvas");
    var gl = c.getContext('webgl');
    if (!gl) {
        message.innerHTML = "WebGL Failed";
        return;
    }
    var shaderProgram;

    var message = document.getElementById("message");
    var message2 = document.getElementById("message2");


    var VSHADER_SOURCE =
    "attribute vec3 m_position;" +
    "attribute vec4 m_color;" +
    "uniform mat4 modelviewmatrix;" +
    "uniform mat4 projectionMatrix;" +
    "varying vec4 vcolor;" +
    "varying vec4 iiivertexpos;" +
    "void main(){" +
    "gl_Position = projectionMatrix * modelviewmatrix * vec4(m_position,1.0);" +
    "vcolor = m_color;" +
    "iiivertexpos = vec4(m_position,1.0);" +
    "}";

    /*projectionMatrix * modelviewmatrix * */

    var FSHADER_SOURCE =
    "precision highp float;" +
    "uniform vec3 lightpos;" +
    "varying vec4 vcolor;" +
    "varying vec4 iiivertexpos;" +
    "void main(){" +
    "float i = length(iiivertexpos.xyz - lightpos);" +
    "float intensity = 1.0 / i;" +
    "gl_FragColor = vec4(0.2,0.3,0.8,99999) * intensity;" +
    "}";

    var shaderProgram;
    var c = document.getElementById("canvas");
    var gl = c.getContext("webgl");
    if (!gl) {
        message.innerHTML = "WebGL Failed";
        return;
    }

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, VSHADER_SOURCE);
    gl.compileShader(vertShader);

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, FSHADER_SOURCE);
    gl.compileShader(fragShader);

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    message.innerHTML = "WebGL Success";

    var g = LookAt(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
    message.innerHTML = g[0] + " , " + g[1] + " , " + g[2] + " , " + g[3] + " , " + g[4] + " , " + g[5] + " , " + g[6] + " , " + g[7] + " , " + g[8] + " , " + g[9] + " , " + g[10] + " , " + g[11] + " , " + g[12] + " , " + g[13] + " , " + g[14] + " , " + g[15];
    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "modelviewmatrix"), false, g);

    var g2 = Perspective(30, c.width / c.height, 0.1, 100);
    message2.innerHTML = g2[0] + " , " + g2[1] + " , " + g2[2] + " , " + g2[3] + " , " + g2[4] + " , " + g2[5] + " , " + g2[6] + " , " + g2[7] + " , " + g2[8] + " , " + g2[9] + " , " + g2[10] + " , " + g2[11] + " , " + g2[12] + " , " + g2[13] + " , " + g2[14] + " , " + g2[15];
    gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "projectionMatrix"), false, g2);

    var gllk = new Array(0.0, 0.0, 2.0);
    gl.uniform3fv(gl.getUniformLocation(shaderProgram, "lightpos"), gllk);

    var vertices = [
        1.0, 1.0, 1.0, 0.0, 0.8, 0.0, 1.0,
        -1.0, 1.0, 1.0, 0.0, 0.8, 0.0, 1.0,
        -1.0, -1.0, 1.0, 0.0, 0.8, 0.0, 1.0,
        1.0, -1.0, 1.0, 0.0, 0.8, 0.0, 1.0,

        1.0, 1.0, -1.0, 0.6, 0.9, 1.0, 1.0,
        -1.0, 1.0, -1.0, 0.6, 0.9, 0.0, 1.0,
        -1.0, -1.0, -1.0, 0.6, 0.9, 0.0, 1.0,
        1.0, -1.0, -1.0, 0.6, 0.9, 0.0, 1.0,

        1.0, 1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
        -1.0, 1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
        -1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,

        1.0, -1.0, -1.0, 1.0, 0.5, 0.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, 0.5, 0.0, 1.0,
        -1.0, -1.0, 1.0, 1.0, 0.5, 0.0, 1.0,
        1.0, -1.0, 1.0, 1.0, 0.5, 0.0, 1.0,

        1.0, 1.0, -1.0, 0.9, 0.0, 0.2, 1.0,
        1.0, 1.0, 1.0, 0.9, 0.0, 0.2, 1.0,
        1.0, -1.0, 1.0, 0.9, 0.0, 0.2, 1.0,
        1.0, -1.0, -1.0, 0.9, 0.0, 0.2, 1.0,

        -1.0, 1.0, -1.0, 0.6, 0.0, 0.6, 1.0,
        -1.0, 1.0, 1.0, 0.6, 0.0, 0.6, 1.0,
        -1.0, -1.0, 1.0, 0.6, 0.0, 0.6, 1.0,
        -1.0, -1.0, -1.0, 0.6, 0.0, 0.6, 1.0
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aVertexPosition = gl.getAttribLocation(shaderProgram, "m_position");
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 7 * 4, 0 * 4);
    gl.enableVertexAttribArray(aVertexPosition);

    var aVertexColor = gl.getAttribLocation(shaderProgram, "m_color");
    gl.vertexAttribPointer(aVertexColor, 4, gl.FLOAT, false, 7 * 4, 3 * 4);
    gl.enableVertexAttribArray(aVertexColor);

    var indices = [
        0, 1, 2, 0, 2, 3,
        4, 6, 5, 4, 7, 6,
        8, 9, 10, 8, 10, 11,
        12, 14, 13, 12, 15, 14,
        16, 17, 18, 16, 18, 19,
        20, 22, 21, 20, 23, 22
    ];

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    gl.enable(gl.ALPHA_TEST);
    gl.enable(gl.DEPTH_TEST);
    //gl.enable(gl.CULL_FACE);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var drawmain = function () {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0);
    }

    setInterval(drawmain, 1);

    //gl.drawArrays(gl.POINTS,0,1);

    function getLocation(x, y) {
        var bbox = c.getBoundingClientRect();
        return {
            x: parseInt((x - bbox.left) * (c.width / bbox.width)),
            y: parseInt((y - bbox.top) * (c.height / bbox.height))
        };
    }

    c.onmousemove = function (e) {
        var location = getLocation(e.clientX, e.clientY);
        //message.innerHTML = "x=" + location.x + ",y=" + location.y;
        var gc = LookAt((location.x - c.width / 2) / (c.width / 8), -(location.y - c.height / 2) / (c.width / 8), 1.8, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
        gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "modelviewmatrix"), false, gc);

        var gllk = new Array((location.x - c.width / 2) / (c.width / 8), -(location.y - c.height / 2) / (c.width / 8), 1.2);
        gl.uniform3fv(gl.getUniformLocation(shaderProgram, "lightpos"), gllk);
    }

}

function Mat4(value) {
    var result = new Array(16);
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 4; x++) {
            result[x + y * 4] = 0.0;
        }
        result[y + y * 4] = value;
    }
    return result;
}

function FVector3(x1, y1, z1) {
    this.X = x1;
    this.Y = y1;
    this.Z = z1;

    this.appInvSqrt = function (f) {
        return 1.0 / Math.sqrt(f);
    }

    this.Normalize = function () {
        var SquareSum = this.X * this.X + this.Y * this.Y + this.Z * this.Z;
        if (SquareSum < 0.000001) {
        }
        else {
            var Scale = this.appInvSqrt(SquareSum);
            this.X *= Scale;
            this.Y *= Scale;
            this.Z *= Scale;
        }
    }

    this.UNV = function (V) {
        var xxx = this.Y * V.Z - this.Z * V.Y;
        var yyy = this.Z * V.X - this.X * V.Z;
        var zzz = this.X * V.Y - this.Y * V.X;
        return new FVector3(xxx, yyy, zzz);
    }

    this.multiply = function (V) {
        var result = this.X * V.X + this.Y * V.Y + this.Z * V.Z;
        return result;
    }

}

function LookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
    var directMat = Mat4(1.0);
    var fvDirect = new FVector3(centerX - eyeX, centerY - eyeY, centerZ - eyeZ);
    fvDirect.Normalize();
    var fvUpD = new FVector3(upX, upY, upZ);
    fvUpD.Normalize();
    var fvC = fvDirect.UNV(fvUpD);
    fvC.Normalize();
    var fvUp = fvC.UNV(fvDirect);
    fvUp.Normalize();
    fvDirect.X = -fvDirect.X;
    fvDirect.Y = -fvDirect.Y;
    fvDirect.Z = -fvDirect.Z;
    directMat[0] = fvC.X;
    directMat[4] = fvC.Y;
    directMat[8] = fvC.Z;
    directMat[1] = fvUp.X;
    directMat[5] = fvUp.Y;
    directMat[9] = fvUp.Z;
    directMat[2] = fvDirect.X;
    directMat[6] = fvDirect.Y;
    directMat[10] = fvDirect.Z;

    var eye = new FVector3(-eyeX, -eyeY, -eyeZ);

    directMat[12] = -eye.multiply(fvC);
    directMat[13] = -eye.multiply(fvUp);
    directMat[14] = eye.multiply(fvDirect);

    return directMat;
}

function Perspective(fov, aspect, near, far) {
    var top = near * Math.tan(fov / 2);
    var bottom = -top;
    var right = top * aspect;
    var left = -right;

    var result = Mat4(1.0);
    result[0] = (2 * near) / (right - left);
    result[5] = (2 * near) / (top - bottom);
    result[8] = (right + left) / (right - left);
    result[9] = (top + bottom) / (top - bottom);
    result[10] = -(far + near) / (far - near);
    result[11] = -1;
    result[14] = -(2 * near * far) / (far - near);
    return result;
}
/*
*/

/*

var mvm = gl.getUniformLocation(shaderProgram,"modelviewmatrix");
gl.uniformMatrix4fv(mvm,false,modelViewMatrix);
*/