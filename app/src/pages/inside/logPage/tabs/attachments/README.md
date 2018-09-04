Component uses the [react-responsive-carousel](https://www.npmjs.com/package/react-responsive-carousel) module. All the gallery part is handled by it.

In our case, the main area is not displayed initially, with a little css it is not a big problem to hide. We could also fork the original repository and introduce a property to toggle that part, but it would be too much trouble.

The component needs a service, that loads the attachments. Right now it is only a sandbox component, so it recieves an array of objects with an src property.
