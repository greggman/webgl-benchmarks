WebGL Benchmarks
================

This is a start at making some benchmarks to show best practices

For now this project is explicitly for testing WebGL Implementations,
not the GPU. Therefore any new benchmark should attempt to draw
as little as possible or not at all if possible.

Examples
--------

* uploading lots of textures
* uploading lots of textures in other formats
* uploading with texImage2D vs subTexImage2D
* setting uniforms
* setting attribs
* using vertex array objects
* creating and deleting objects
* calling drawArray or drawElements

