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
--------------------------------------------
Hooks
1. magic function that hook into a component
2. usaually starts with on or use
3. lifecycle hooks
4. other hooks
5. Golden rule: can only be used setup()
--------------------------------------------
lifecycle hooks
onWillStart: before being is rendered
onMounted: After being mounted in DOM
on WillDestroy: before removal from DOM
-----------------------------------------
Composibility
Hooks can be compsed
hook within another hook
---------------------------------------

State another hook
1. useState({"key":"value"})
2. similar to the react version
3. observer pattern
4. re-renders component on update

Best practices
1. a single source of truth (for each piece of state)
2. state should flow from parent to child
3. each "piece of state" is owned by 1 entity
4. only owner should update state
5. donot modify your props
6. start with a naive implementation
7. only if needed, move to a more complex one

shared state
1. move useState in a common ancestor component
2. propagate state to child through props
						component							
						(state value)
				A								B			
				(props.value)				(props.value)

Reactive primitive 
1. core of state mangment
2. reactive({"key":"value"}, callback);
3. usestate is wraper with callback bieng the render function of the component
4. callback optional
-----------------------------
Ref hook
1. useful way to interact with internal part of a component
2. targeted using t-ref
3. useRef()
<input t-ref="input"/>
inputRef = useRef("input");
inputRef.el.focus();
---
el is set to the html element after being mounted on dom
el property is null at first
convention: Ref suffix
owl provides backbone
dom can be manipulated by you
