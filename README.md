# PtrJS

A framework for JavaScript canvas

## Documentation

##IMPORTANT NOTICE

Since the version 2.0.6 the `log` function, that prints messages into the developer console, has been renamed to `print`, and the `logh` function, which returns the logarithm of the given number, has been renamed to `log`. **This can create errors when upgrading from version 2.0.5 and below to version 2.0.6 and up. Be wary of that**\
Also, the versions below the version 2.0.6 are no longer available through the CDN due to a critical error. **The lowest version you can now use is 2.0.6**

## Variables

- **mobile** - variable that is `true` if the code is opened from a mobile device or `false` if it is not; useful if you have special control buttons for mobile devices
- **width** and **height** - contain the width and height of the canvas element
- **innerWidth** and **innerHeight** - contain the inner width and inner height of the browser window
- **mouseX** and **mouseY** - contain the current coordinates of the mouse on the screen
- **PI** - Pi constant
- **TWO_PI** - two times Pi
- **HALF_PI** - half Pi
- **E** - Euler's constant
- **SQRT2** - square root of 2
- **SQRT1_2** - square root of 1/2
- **LN2** - natural logarithm of 2
- **LN10** - natural logarithm of 10
- **LOG2E** - base 2 logarithm of e
- **LOG10E** - base 10 logarithm of e
- **frameCount** - contains the number of frames that have passed since the loop started running
- **frameRate** - contains the current number of frames per second
- **mousePressed** - equals to `true` if the mouse is currently being pressed or `false` if it isn't

## Functions

- `setup()` - main function when the documents has been fully loaded
- `update()` - main function called 60 times per second by default; can be changed using the framerate function
- `preload()` - runs before anything else; useful for preloading images
- `noCanvas()` - creates a project without a canvas that still uses the update and setup functions
- `framerate(newFramerate)` - changes the framerate to the new one
- `map(num, a, b, c, d)` - takes a number that is in range from a to b numbers and maps it to the range from c to d
- `random(num1, num2)` - returns a random number in the range of num1 to num2; if num2 is null, it returns a random number from 0 to num1, while never returning the maximum value; if both num1 and num2 are null, it returns a random number from 0 to 1; if an array is passed to the random function, it will return a random element from that array
- `randInt(num1, num2)` - same as random(), except it returns a whole number; you must provide at least one argument
- `randomizeColor(r, g, b)` - returns a random shade of the given color as an array of [red, green, blue] values
- `floor(num)` - rounds the given number to the next lower integer
- `ceil(num)` - rounds the given number to the next higher integer
- `round(num)` - rounds the given number mathematically
- `pow(num, pow)` - returns num to the power of pow
- `sqrt(num)` - returns the square root of the given number
- `sqr(num)` - returns the square of given number
- `abs(num)` - returns the absolute value of the given number
- `sin(angle)` - returns the sine of given angle
- `cos(angle)` - returns the cosine of given angle
- `asin(num)` - returns the arcus sine of the given number
- `acos(num)` - returns the arcus cosine of the given number
- `tan(angle)` - returns the tangent of the given angle
- `atan(num)` - returns the arcus tangnet of the given number
- `exp(num)` - return E to the power of num
- `log(num)` - returns the natural logarith of num with base E
- `min(nums)` - returns the lowest of the numbers given; takes multiple numbers as input
- `max(nums)` - returns the highest of the numbers given; takes multiple numbers as input
- `write(text)` - writes the given text to the document
- `print(text)` - logs the given text to the console
- `table(array)` - displays the array in a table in the console
- `error(text)` - writes the given text to the console as an error
- `warn(text)` - writes the given text to the console as a warning
- `setText(element, text)` - writes the given text to the element with the given ID
- `keyDown()` - activates when a key is pressed; has a built in variable called keyCode which contains the code of the pressed key
- `keyUp()` - activates when a key is released; has a built in variable called keyCode which contains the code of the released key
- `touchStart()` - activates only on touchscreen devices when the screen has been touched; it is given an array as an argument which contains all the information about all the touches of the screen
- `touchMove()` - activates only on touchscreen devices when the screen is touched and a touch is moving on the screen; it is given an array as an argument which contains all the information about all the touches of the screen
- `touchEnd()`- activates only on touchscreen devices when the screen has been released; it is given an array as an argument which contains all the information about all the touches of the screen
- `mouseDown()` - activates when the left mouse button is clicked; the mouse coordinates can be accessed through the mouseX and mouseY variables
- `mouseMove()` - activates when the left mouse button is held down and mouse is moving; the mouse coordinates can be accessed through the mouseX and mouseY variables
- `mouseUp()` - activates when the left mouse button is released; the mouse coordinates can be accessed through the mouseX and mouseY variables
- `swipe(dir)` - a callback function called when user swipes the screen on a mobile device; it is passed an argument dir which contains the direction of the swipe; dir can either be equal to UP, DOWN, LEFT, or RIGHT
- `createVector(x, y)` - returns a Vector object with the given x and y values; if x and y are not given, it returns a zero vector
- `randomVector(magnitude)` - returns a random Vector object; magnitude is an optional argument; if provided, the returned vector will have the given magnitude, otherwise, the magnitude is set to 1
- `createPoint(x, y)` - returns a Point object with the given x and y values
- `randomPoint()` - returns a random Point object
- `createCanvas(width, height, canvas)` - returns a Canvas object wit the given width and height values; canvas is an optional argument in case you want to use an existing canvas instead of creating a new one, then you provide the pointer to the canvas you want to use
- `Vector.fromAngle(angle)` - returns a Vector object generated from the given angle
- `color(red, green, blue, alpha)` - returns a string color
- `isInArray(array, element)` - returns the element index in the array if the element is indeed in the array, returns false otherwise
- `ramoveFromArray(array, element)` - removes the element from the array if it is indeed in the array, otherwise does nothing
- `createMatrix(columns, rows)` - returns a matrix (2D array) with the number of columns and rows filled with null elements
- `distance(x1, y1, x2, y2)` - returns the distance between given coordinates; only two arguments can be passed in which case both of them must be either of Vector or Point class and their distance will be returned; you can find the distance between two points, two vectors, or a point and a vector
- `swap(array, index1, index2)` - swaps the two array elements at the given indexes
- `sort(array)` - sorts the array
- `toRadians(degrees)` - converts the number of degrees to radians and returns the result
- `toDegrees(radians)` - converts the number of radians to degrees and returns the result
- `constrain(num, min, max)` - constrains the given number between the min and the max values and returns the value
- `lerp(value1, value2, step)` - lerp - Linear Interpolation - smooth transitioning between two values with the step given
- `joinArray(array, spacing)` - returns a string of all the elements in the array divided by the spacing; spacing is optional, if there is none, it will return the string of all the elements concatenated without spacing
- `removeChars(text, characters)` - takes two strings as an output; string characters contains all the characters that you want removed from the original string and returns the result
- `removeCharAt(text, index)` - removes the character at the given index from the given string and returns the result
- `replaceCharAt(text, index, replacement)` - replaces the character at the given index from the given string with the given replacement and returns the result

## Classes

## Canvas

Class Canvas is the main class of the framework. When an instance is created, it creates a canvas element and appends it to the document body. An instance can be created by calling the `createCanvas()` function. Example: `let canvas = createCanvas(400, 400);`

### Attributes

- **width** - contains the width of the canvas; it can also be accessed through the width global variable
- **height** - contains the height of the canvas; it can also be accessed through the height global variable
- **maxWidth** - maximum canvas width; by default set to 99.000, from -33.000 to + 66.000
- **maxHeight** - maximum canvas height; by default set to 99.000, from -33.000 to + 66.000
- **canvas** - points to the actual canvas element that is displayed in the document
- **ctx** - contains the context of the canvas element

### Methods

- `setMaxSize(newMaxWidth, newMaxHeight)` - sets the new maximum width and height of the canvas; can take one argument, in which case both maxWidth and maxHeight are set to that value
- `setSize(newWidth, newHeight)` - changes the dimensions of the canvas to the new dimensions; also updates the Width and Height global variables; can take one argument, in which case both width and height are set to that value
- `fullScreen()` - makes the canvas take the whole window
- `clear()` - clears the whole canvas; called by default at every frame
- `background(r, g, b)` - changes the canvas background color to the given RGB values; if only one value is passed to the method, that value is taken as the red, green, and blue value
- `fill(r, g, b, a)` - changes the fill color of the canvas; if only one value is passed to the method, that value is taken as the red, green, and blue value, and alpha is set to 255; to set the alpha value, you must pass all four arguments; alpha ranges from 0 to 255
- `noFill()` - removes the fill
- `stroke(r, g, b, a)` - changes the stroke color of the canvas; if only one value is passed to the method, that value is taken as the red, green, and blue value, and alpha is set to 255; to set the alpha value, you must pass all four arguments; alpha ranges from 0 to 255
- `noStroke()` - removes the stroke
- `lineWidth(width)` - changes the stroke line width
- `line(x1, y1, x2, y2)` - draws a line from (x1, y1) to (x2, y2); lineWidth function affects it
- `lineFromVector(vector)` - draws a line from a vector
- `lineFromAngle(x, y, angle, length)` - draws a line from an angle in degrees at the given coordinates with the provided length
- `rect(x, y, width, height)` - draws a rectangle starting at the given coordinates with the given dimensions; only two arguments can be passed, in which case x and y are set to the first number, and width and height are set to the second number
- `rectMode(mode)` - sets the drawing mode for rectangles on canvas; takes a string for an input; valid values are CENTER or CORNER
- `point(x, y)` - draws a point at the x and y coordinates; the size of the point is changed via the lineWidth method
- `circle(x, y, radius)` - draws a circle at the given coordinates with the given radius
- `ellipse(x, y, width, height, rotation)` - draws an ellipse at the given coordinates with the provided dimensions; rotation is an optional argument and it takes a number of degrees
- `arc(x, y, radius, startAngle, endAngle)` - draws an arc at the given coordinates with the given parameters
- `beginShape(x, y)` - starts drawing a new shape at the given coordinates
- `vertex(x, y)` - adds another point to the new shape at the given coordinates
- `closeShape()` - closes the new shape
- `text(text, x, y, fontSize, fontName)` - displays the given text on the canvas at the given coordinates; fontSize is an integer, fontName is a string
- `textAlign(alignment)` - sets the alignment for the displayed text; takes a string for an input; valid values are START, END, LEFT, RIGHT, CENTER
- `translate(x, y)` - translates the canvas starting point to the given coordinates
- `rotate(angle)` - rotates the canvas by the given angle
- `scale(widthScale, heightScale)` - scales the canvas proportionate to the given arguments; if only one argument is given, both width and height are scaled in proportion to that one argument; if no arguments are passed, canvas is returned to scale 1
- `save()` - saves the current state of the canvas
- `restore()` - restores the last saved state of the canvas
- `screenshot()` - takes a screenshot of the canvas and saves it as a png file
- `playPause()` - switches between states of playin and paused
- `pause()` - pauses the loop if it is unpaused
- `play()` - unpauses the loop if it is paused
- `drawImage(image, sx, sy, swidth, sheight, x, y, width, height)` - draws an image on the canvas; Arguments:

1. image - an image object
2. sx (optional) - x value from which the cropping of the image starts
3. sy (optional) - y value from which the cropping of the image starts
4. swidth (optional) - width of the crop
5. sheight (optional) - height of the crop
6. x - x coordinate of the canvas from which the image starts drawing
7. y - y coordinate of the canvas from which the image starts drawing
8. width (optional) - width of the image on the canvas; if left blank, it will be displayed in its full size
9. height (optional) - height of the image on the canvas; if left blank, it will be displayed in its full size

## Image

Takes a path to the image as an argument.

### Attributes

- **path** - contains the path to the image
- **filename** - contains the name of the image file
- **image** - contains the image element

## Point

A point on the canvas

### Attribures

- **x** - the x coordinate of the point
- **y** - the y coordinate of the point

### Methods

- `distance(point2)` - returns the distance to the given point
- `isOffScreen()` - returns true if the point is off the screen to any side; translating the canvas affects its work

## Vector

A 2D Vector object

### Attributes

- **x** - the x coordinate
- **y** - the y coordinate
- **previousX** - contains the previous x coordinate of the vector in case it has changed
- **previousY** - contains the previous y coordinate of the vector in case it has changed

### Methods

- `set(newX, newY)` - changes vectors x and y coordinates to the new ones
- `add(vector2)` - adds the two vectors and changes x and y coordinates to the result ones
- `subtract(vector2)` - subtracts the two vectors and changes x and y coordinates to the result ones
- `multiply(vector2)` - multiplies the two vectors and changes x and y coordinates to the result ones
- `divide(vector2)` - divides the two vectors and changes x and y coordinates to the result ones
- `angle()` - returns the angle of the vector in relation to the x axis
- `rotate(angle)` - rotates the vector by the given angle
- `magintude()` - returns the magnitude (length) of the vector
- `magnitudeSqr()` - returns the magnitude squared
- `setMagnitude(newMagnitude)` - sets the magnitude (length) of the vector to the new one
- `copy()` - returns a copy of the vector
- `normalize()` - normalizes the vector (sets its magnitude to 1)
- `distance(vector2)` - returns the distance to the given vector
- `isOffScreen()` - returns true if the vector is off the screen to any side; translating the canvas affects its work
- `lerp(vector2, step)` - lerp - Linear Interpolation - smooth transitioning between current values to the values of the given vector with the provided step
- `constrain(minX, maxX, minY, maxY)` - constrains vector between given values

## Color

A color class

### Attributes

- **red** - red value of the color
- **green** - green value of the color
- **blue** - blue value of the color
- **alpha** - alpha value of the color

### Methods

- `randomize(randomizeAlpha)` - returns a new Color object containing a random shade of the original color; randomizeAlpha is an optional argument; if it is set to true; the alpha value of the color will also bi randomized
- `color()` - returns a string containing the color

## You can check out the example folder for some examples of code usage

## Creating a new PtrJS project

To create a new PtrJS project you can clone one of the templates from the examples folder. The offline template is self-contained and all the script files come with it, whereas the other template uses the online version of the file and uses the latest version by default. You can change this by changing the url in the script tag in the index.html file.

You can also implement the files into your existing project by dowloading the script file or adding it through the CDN. The URL for the CDN is as follows:\
 https://cdn.petarmijailovic.com/ptrjs/version/ptr.js or https://cdn.petarmijailovic.com/ptrjs/version/ptr.min.js \
To use the latest version, add the following line of code into your head tag

```
<script src="https://cdn.petarmijailovic.com/ptrjs/latest/ptr.min.js"></script>
```

The lowest available version is 2.0.6\
The latest version is 2.0.6
