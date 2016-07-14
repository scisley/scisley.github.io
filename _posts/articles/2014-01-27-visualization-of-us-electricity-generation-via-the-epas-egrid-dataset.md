---
layout: post
title: Visualization of U.S. Electricity Generation via the EPA's eGRID Dataset
date: 2014-01-27 21:59:27.000000000 -07:00
type: post
categories: articles
share: true
tags:
- data visualization
- energy
---

I've been using the data visualization software package called Tableau for a while now. It is really a fantastic product, with lots of online tutorials and help. It even has a [free one-year student edition!](http://www.tableausoftware.com/academic/students) Below is my attempt to show how power is generated in the United States. The data comes from the EPA's [eGRID](http://www.epa.gov/cleanenergy/energy-resources/egrid/index.html) data set, with 2009 being the most recent data. It is a geographic bubble chart with the amount of energy produced at each plant represented by its size, and the fuel source for that energy by the bubble's color. I've used some transparency to help with the overplotting. Even so, many points close together are hard to distinguish. I added a dark border to each bubble to help with that.

![eGRID Annual Net Generation Data by Fuel Type]({{ site.baseurl }}/assets/egrid-annual-net-generation-data-by-fuel-type1.png)

I've also used a horizontal bar chart as a legend, and it includes the percent that came from each source. So you can see that we get the largest percentage of our fuel from coal, at 45.2%, and the least from solar, with less than 0.0% (the actual value is 0.03%). The box on the lower right is the average annual plant production for each type of fuel. Note that this is different than the average plant size (its 'nameplate capacity'). Production refers to how much energy was actually produced during the year, capacity refers to how much power could be provided at any particular time. If all plants operated all the time (24/7) the distinction wouldn't matter, but all plants have some downtime, like for maintenance, or when the wind doesn't blow for wind power.

Have any comments, ways it could be improved, or would you like to see a subset of the map, say with just a single component highlighted, just let me know!

Update: Because I couldn't help myself, I went ahead and made the individual plots as well:

[![eGRID Map - Coal Constant Scale]({{ site.baseurl }}/assets/egrid-map-coal1.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-coal1.png)
[![eGRID Map - Gas Constant Scale]({{ site.baseurl }}/assets/egrid-map-gas1.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-gas1.png)
[![eGRID Map - Nuclear Constant Scale]({{ site.baseurl }}/assets/egrid-map-nuclear1.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-nuclear1.png)
[![eGRID Map - Oil Constant Scale]({{ site.baseurl }}/assets/egrid-map-oil.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-oil.png)
[![eGRID Map - Hydro Constant Scale]({{ site.baseurl }}/assets/egrid-map-hydro1.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-hydro1.png)
[![eGRID Map - Wind Constant Scale]({{ site.baseurl }}/assets/egrid-map-wind1.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-wind1.png)
[![eGRID Map - Biomass Constant Scale]({{ site.baseurl }}/assets/egrid-map-biomass1.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-biomass1.png)
[![eGRID Map - Geothermal Constant Scale]({{ site.baseurl }}/assets/egrid-map-geothermal.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-geothermal.png)

The images below are rescaled to show each type of fuel individually and the other washed out power plants were removed. Be careful comparing them to the first map (with all fuels shown together) as the bubbles are very different scales.

[![Coal power plants from the EPA's eGRID data set]({{ site.baseurl }}/assets/egrid-map-coal.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-coal.png)
[![Gas power plants from the EPA's eGRID data set]({{ site.baseurl }}/assets/egrid-map-gas.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-gas.png)
[![Nuclear power plants from the EPA's eGRID data set]({{ site.baseurl }}/assets/egrid-map-nuclear.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-nuclear.png)
[![Hydroelectric power plants from the EPA's eGRID data set]({{ site.baseurl }}/assets/egrid-map-hydro.png){: 
width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-hydro.png)
[![Wind power plants from the EPA's eGRID data set]({{ site.baseurl }}/assets/egrid-map-wind.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-wind.png)
[![Biomass power plants from the EPA's eGRID data set]({{ site.baseurl }}/assets/egrid-map-biomass.png){: width="224" height="178"}]({{ site.baseurl }}/assets/egrid-map-biomass.png)

<span>Visualization of Energy Production in the United States using the EPA's eGRID Dataset</span> by <a href="http://steveisley.wordpress.com/2014/01/27/visualization-of-u-s-electricity-generation-via-the-epas-egrid-dataset" rel="cc:attributionURL">Steven C. Isley</a> is licensed under a <a href="http://creativecommons.org/licenses/by/4.0/" rel="license">Creative Commons Attribution 4.0 International License</a>.

[![license image]({{ site.baseurl }}/assets/88x31.png)](http://creativecommons.org/licenses/by/4.0/)