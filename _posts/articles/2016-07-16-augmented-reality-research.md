---
layout: post
title: Augmented Reality Research
date: 2016-07-16 03:17:21.000000000 -07:00
type: post
categories: articles
summary:
  thumb: /images/thumbs/ar-app-small.jpg
  desc:  Augmented Reality Research
tags:
- programming
- mobile technology
- data visualization
---

I remember reading a scifi short story once ([Analog](https://www.analogsf.com) I believe, but I've searched and can't find the original story) about an implant that would help people make decisions. In the story, a guy goes to the grocery store to buy a bag of rice, and the implant overlays information about the dozens of options available to him. It puts red x's over the bags that don't meet one of his criteria, one after another, then when it get's down to the last couple bags he chooses one made by a company that supports a cause he cares about.

![Augmented Reality App In-Use]({{ site.baseurl }}/images/ar-app-med.jpg) 

I remember reading that story and thinking, "man, that would be cool," and lucky enough for me my job at NREL has actually allowed me to do research in that direction! I'm in a group called the New Concepts Incubator and we take ideas about technology, behavioral science, and ways to save energy, and then we test them with real people. I pitched a crazy idea to my boss - why not use augmented reality to show people information about the products they buy and help them make better choices. Not better defined by me, or my boss, or NREL, but by themselves. 

My boss gave me the go-ahead and about three months later (and many sleepless nights) I produced an app using the [Vuforia](http://www.vuforia.com/) augmented reality library that did just that, and even a bit more - but only for two products, breakfast cereal and bottled water. First, it starts off with a quick survey (done on the phone) to understand what kind of products people like. It uses that information to assign personalized scores to the products it recognizes. From a distance, it displays a big letter grade, when close-up, it shows the product details the person said they care about. Here's a youtube video below:

<iframe width="420" height="315" src="https://www.youtube.com/embed/aHQqCL27b4U" frameborder="0" allowfullscreen></iframe>

I think the results are pretty good. You can see in the video that it correctly identifies most cereal boxes, and that the tracking acceptable in most cases. The video may look a bit grainy, but it is a video capture of a Nexus 6 smartphone, so it actually looked quite sharp when viewed on that small screen, and there was no noticable delay in the video. 

Once I had the app finished, I designed and oversaw a randomized controlled trial at a nearby grocery store (not a specialty foods store, but a large national chain grocery store). We had people buy bottled water and cereal, and randomly assigned to use the app for only one of the purchases. That way we had a control group that bought a product without the app to compare the with-app results to. The results we got were interesting. I work at NREL, so we made sure that everybody saw carbon footprint information in addition to the product attributes they said they cared about during the intro survey. For the bottled water, those with the app ended up buying products with an average carbon footprint a full 25% less than those without the app! This is a pretty huge change in this type of research.

For the cereal, the results were very different. The carbon information had no impact - but people with the app ended up making much more nutritious cereal purchases: 30% less sugar, 45% more fiber, 15% less fat. These numbers are substantial in the world of product information campaigns.

The beauty of augmented reality, compared to informational posters or 'seal of approval' images on the box, is that the information can be personalized to each individual. People care about a huge variety of things. Some people want healthy food, others want chocolate bits included. Some people care about the environment, for others price is more important. Customizing the information displayed allows people to make better choices as judged by themselves.

I wish I could find that short story again. I'd contact the author and let him know his story, written over a decade ago, inspired some dude he'd never met to do research in a place he's probably never heard of.

(I've written a journal article on the research, and it's currently in review. I'll update this with a link when it gets published.)