This

1. Refers to the caller of the function
2. Function / Global scope: global object (window in browser)
3. arrow function: retain the value of the surrounding context
4. Method: object itself
5. Strict mode: undefined in iregular functions
---------------------------------------
call() : invoke with a specified "this" value
apply() : same as call but args are in array
bind() : create copy of function with fixed "this".
--------------------------------------
t-slot is special prop 

1. if we want to use then first define in child component xml file like  <t t-slot="default" /> and then <span>uuuuuuuu/span> is used in parent xml file in <child></child> div----
and it is neccessory to define slots in child component props (slots : {type: object})
here default is key and value in span is value

2. not only slots also more like pass it down, use dynamic slots, use params, use scopes
---------------------------------------
t-on is also special props

1. t-on-[Event]
2. used to call methods
3. bind a method
4. call using arrow function

HTML Events
1. Pass additional information to a slot
2. e.g: onclick: Elemnt is clicked
3. e.g: mouseover: hovering over an element
4. t-on-[HTML_EVENT]
5. preventDefault()
6. stopPropagation()
----------------------------------------
Trigger'
1. this.trigger('my-event', {data:somedata});
2. custom events
3. Bubbling: propagative via DOM event bubbling model
4. Allows communication between components
---------------------------------------------
												DOM TREE 																	
Document--<html(root element)>--
		<head>--
				<body>-- click bubbles
						<div>-- click bubbles
								<span>-- click bubbles
										<button>
										receives click event
										
--------------------------------------------
Component lifecycyle
1. Creation
2. Update
3. Deletion
