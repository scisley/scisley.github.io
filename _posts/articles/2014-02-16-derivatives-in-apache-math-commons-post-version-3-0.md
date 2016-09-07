---
layout: post
title: Derivatives in Apache Math Commons Post Version 3.0
date: 2014-02-16 03:17:21.000000000 -07:00
type: post
categories: articles
summary:
  thumb: /images/thumbs/derivative.png
  desc:  Apache Math Derivatives
tags:
- programming
---

For my dissertation, I've been using the [Apache Math Commons](http://commons.apache.org/proper/commons-math/index.html) Java library in order to incorporate some numerical analysis into an agent based economic model I've built. I started out using version 3.0 of the library and defining a function that had a derivative was pretty straight forward.

When I migrated to version 3.2, one thing that took me a little while to figure out was how to use the new [DerivativeStructure](http://commons.apache.org/proper/commons-math/javadocs/api-3.2/index.html). I thought I would give a very simple example to help others out.

The old way involved defining the derivative as another function. You had to manually figure out what this other function should be and code that into your program. The new way involves defining a DerivateStructure in a somewhat clunky manner, and then using that to return whatever derivatives you want. The new method is much more powerful and uses a technique called [automatic differentiation](http://en.wikipedia.org/wiki/Automatic_differentiation). I had never heard of this before, and if you're like me you should definitely check out the link. Basically, it allows numerically exact derivatives, of any order and of any number of free variables, to be calculated. This <strong><em>does not</em></strong> use a finite difference method.

What this means for us is that while implementing derivatives has become more verbose - we don't even have to manually determine the formula for ourselves! You use the derivative structure to specify your formula, and the derivatives are all calculated automagically for you.

Hopefully the following code can clear this up a little. This was done using version 3.2 of the Apache Math Commons library.

{% highlight java linenos %}
import org.apache.commons.math3.analysis.DifferentiableUnivariateFunction;
import org.apache.commons.math3.analysis.UnivariateFunction;
import org.apache.commons.math3.analysis.differentiation.DerivativeStructure;
import org.apache.commons.math3.analysis.differentiation.UnivariateDifferentiableFunction;
import org.apache.commons.math3.exception.DimensionMismatchException;

public class ApacheMathSandBox {
public static void main(String[] args) {
	ApacheMathSandBox sandBox = new ApacheMathSandBox();
	sandBox.testOldWay();
	sandBox.testNewWay();
}

public void testOldWay() {
	// First create a quadratic function that has a specified minimum
	DifferentiableUnivariateFunction quadFunction = new Quadratic3_0(1, 5);
	System.out.println("Using the old DifferentiableUnivariateFunction way");
	// To get the value of the function
	System.out.println("Value at x=3: " + quadFunction.value(3));
	System.out.println("Value at x=5: " + quadFunction.value(5));
	System.out.println("Value at x=6: " + quadFunction.value(6));

	// To get the value of the derivative you need to pull out the derivative function first
	System.out.println("Derivative at x=3: " + quadFunction.derivative().value(3));
	System.out.println("Derivative at x=5: " + quadFunction.derivative().value(5));
	System.out.println("Derivative at x=6: " + quadFunction.derivative().value(6));

}

public void testNewWay() {
	// First create a quadratic function that has a specified minimum

	UnivariateDifferentiableFunction quadFunction = new Quadratic3_2(1, 5);
	System.out.println("Using the new UnivariateDifferentiableFunction way");

	// To get the value of the function
	System.out.println("Value at x=3: " + quadFunction.value(3));
	System.out.println("Value at x=5: " + quadFunction.value(5));
	System.out.println("Value at x=6: " + quadFunction.value(6));

	// To get the value of the derivative you need to pull out the derivative function first
	System.out.println("Derivative at x=3: " + quadFunction.value(new DerivativeStructure(1,1,0,3)).getPartialDerivative(1));
	System.out.println("Derivative at x=5: " + quadFunction.value(new DerivativeStructure(1,1,0,5)).getPartialDerivative(1));
	System.out.println("Derivative at x=6: " + quadFunction.value(new DerivativeStructure(1,1,0,6)).getPartialDerivative(1));

}

//	 DifferentiableUnivariateFunctions can seem odd at first. It extends
//	 UnivariateFunction, which is where it gets its value method from, and
//	 then adds a new method that returns a UnivariateFunction that represents
//	 the derivative. So a DifferentiableUnivariateFunction has a .value method
//	 that returns the value, and then a method that returns a different
//	 UnivariateFunction whose .value method returns the derivative.
public class Quadratic3_0 implements DifferentiableUnivariateFunction {
	private double a;
	private double min;

	public Quadratic3_0(double a, double min) {
		this.a = a;
		this.min = min;
	}

	@Override
	public double value(double x) {
		return a*(x-min)*(x-min);
	}

	@Override
	public UnivariateFunction derivative() {
		return new UnivariateFunction() {
			@Override
			public double value(double x) {
				return 2*(x-min);
			}
		};
	}
}

//	 The new way of doing things uses a UnivariateDifferentiableFunction (I know, the name is almost
//	 the same as the old, they probably did this to allow people to continue using the deprecated
//	 older classes). This beast works in an entirely different way! Getting the value of the function
//	 is still the same, but now the derivative requires more legwork.
public class Quadratic3_2 implements UnivariateDifferentiableFunction {
	private double a;
	private double min;

	public Quadratic3_2(double a, double min) {
		this.a = a;
		this.min = min;
	}

	@Override
	public double value(double x) {

		// This method is nice in that you don't have to repeat yourself
		return value(new DerivativeStructure(1,1,x)).getValue();

		// This would also work, and is almost certainly faster!
		//return a*(x-min)*(x-min);
	}

	@Override
	public DerivativeStructure value(DerivativeStructure t)
			throws DimensionMismatchException {
		return t.subtract(min).pow(2).multiply(a);
	}
}

{% endhighlight %}

I think the strangest line comes in at:
{% highlight java %}
System.out.println("Derivative at x=3: " + quadFunction.value(new DerivativeStructure(1,1,0,3)).getPartialDerivative(1));
{% endhighlight %}

Here, a new DerivativeStructure is created, using a somewhat [mystifying constructor](http://commons.apache.org/proper/commons-math/javadocs/api-3.2/index.html). This is where things get verbose. You need to specify how many parameters your DerivativeStructure has (argument 1), how many derivatives to track (argument 2), which parameter this particular DerivativeStructure represents (argument 3, the first and in this case only parameter is given by 0), and finally the value (argument 4).

So our line from above says that we're creating a new DerivativeStructure that will be used in a formula with only a single parameter. We want to calculate derivatives up to order 1 (this includes order 0, the function value, and order 1, the first derivative), and we want it evaluated at x=3.

I know this can seem like a lot of overhead, and sometimes it is, but it can really save you a ton of time if you have a complicated expression that would take pages to differentiate, and then you have to code that yourself with all the possibility of making an error. And that's just for a single derivative. This framework really shines when you have multivariate equations and you need 3rd or 4th order derivatives.