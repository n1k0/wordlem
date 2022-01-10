(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.Z.H === region.ai.H)
	{
		return 'on line ' + region.Z.H;
	}
	return 'on lines ' + region.Z.H + ' through ' + region.ai.H;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a7,
		impl.bw,
		impl.bs,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		w: func(record.w),
		_: record._,
		X: record.X
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.w;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value._;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.X) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a7,
		impl.bw,
		impl.bs,
		function(sendToApp, initialModel) {
			var view = impl.bx;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.a7,
		impl.bw,
		impl.bs,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.Y && impl.Y(sendToApp)
			var view = impl.bx;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.aT);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bv) && (_VirtualDom_doc.title = title = doc.bv);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bl;
	var onUrlRequest = impl.bm;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		Y: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.aA === next.aA
							&& curr.ao === next.ao
							&& curr.ax.a === next.ax.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		a7: function(flags)
		{
			return A3(impl.a7, flags, _Browser_getUrl(), key);
		},
		bx: impl.bx,
		bw: impl.bw,
		bs: impl.bs
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { a4: 'hidden', aW: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { a4: 'mozHidden', aW: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { a4: 'msHidden', aW: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { a4: 'webkitHidden', aW: 'webkitvisibilitychange' }
		: { a4: 'hidden', aW: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aG: _Browser_getScene(),
		aM: {
			aO: _Browser_window.pageXOffset,
			aP: _Browser_window.pageYOffset,
			aN: _Browser_doc.documentElement.clientWidth,
			an: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		aN: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		an: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aG: {
				aN: node.scrollWidth,
				an: node.scrollHeight
			},
			aM: {
				aO: node.scrollLeft,
				aP: node.scrollTop,
				aN: node.clientWidth,
				an: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aG: _Browser_getScene(),
			aM: {
				aO: x,
				aP: y,
				aN: _Browser_doc.documentElement.clientWidth,
				an: _Browser_doc.documentElement.clientHeight
			},
			a_: {
				aO: x + rect.left,
				aP: y + rect.top,
				aN: rect.width,
				an: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.ba) { flags += 'm'; }
	if (options.aV) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.b) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.b * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.b);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.c);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{d: nodeList, b: (len / $elm$core$Array$branchFactor) | 0, c: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {ak: fragment, ao: host, av: path, ax: port_, aA: protocol, aB: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$NewWord = function (a) {
	return {$: 1, a: a};
};
var $elm$random$Random$Generate = $elm$core$Basics$identity;
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = $elm$core$Basics$identity;
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0;
		return function (seed0) {
			var _v1 = genA(seed0);
			var a = _v1.a;
			var seed1 = _v1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		};
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0;
		return A2($elm$random$Random$map, func, generator);
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			A2($elm$random$Random$map, tagger, generator));
	});
var $author$project$Main$Idle = {$: 0};
var $author$project$Words$english = A2($elm$core$String$split, ',', 'which,there,their,about,would,these,other,words,could,write,first,water,after,where,right,think,three,years,place,sound,great,again,still,every,small,found,those,never,under,might,while,house,world,below,asked,going,large,until,along,shall,being,often,earth,began,since,study,night,light,above,paper,parts,young,story,point,times,heard,whole,white,given,means,music,miles,thing,today,later,using,money,lines,order,group,among,learn,known,space,table,early,trees,short,hands,state,black,shown,stood,front,voice,kinds,makes,comes,close,power,lived,vowel,taken,built,heart,ready,quite,class,bring,round,horse,shows,piece,green,stand,birds,start,river,tried,least,field,whose,girls,leave,added,color,third,hours,moved,plant,doing,names,forms,heavy,ideas,cried,check,floor,begin,woman,alone,plane,spell,watch,carry,wrote,clear,named,books,child,glass,human,takes,party,build,seems,blood,sides,seven,mouth,solve,north,value,death,maybe,happy,tells,gives,looks,shape,lives,steps,areas,sense,speak,force,ocean,speed,women,metal,south,grass,scale,cells,lower,sleep,wrong,pages,ships,needs,rocks,eight,major,level,total,ahead,reach,stars,store,sight,terms,catch,works,board,cover,songs,equal,stone,waves,guess,dance,spoke,break,cause,radio,weeks,lands,basic,liked,trade,fresh,final,fight,meant,drive,spent,local,waxes,knows,train,bread,homes,teeth,coast,thick,brown,clean,quiet,sugar,facts,steel,forth,rules,notes,units,peace,month,verbs,seeds,helps,sharp,visit,woods,chief,walls,cross,wings,grown,cases,foods,crops,fruit,stick,wants,stage,sheep,nouns,plain,drink,bones,apart,turns,moves,touch,angle,based,range,marks,tired,older,farms,spend,shoes,goods,chair,twice,cents,empty,alike,style,broke,pairs,count,enjoy,score,shore,roots,paint,heads,shook,serve,angry,crowd,wheel,quick,dress,share,alive,noise,solid,cloth,signs,hills,types,drawn,worth,truck,piano,upper,loved,usual,faces,drove,cabin,boats,towns,proud,court,model,prime,fifty,plans,yards,prove,tools,price,sheet,smell,boxes,raise,match,truth,roads,threw,enemy,lunch,chart,scene,graph,doubt,guide,winds,block,grain,smoke,mixed,games,wagon,sweet,topic,extra,plate,title,knife,fence,falls,cloud,wheat,plays,enter,broad,steam,atoms,press,lying,basis,clock,taste,grows,thank,storm,agree,brain,track,smile,funny,beach,stock,hurry,saved,sorry,giant,trail,offer,ought,rough,daily,avoid,keeps,throw,allow,cream,laugh,edges,teach,frame,bells,dream,magic,occur,ended,chord,false,skill,holes,dozen,brave,apple,climb,outer,pitch,ruler,holds,fixed,costs,calls,blank,staff,labor,eaten,youth,tones,honor,globe,gases,doors,poles,loose,apply,tears,exact,brush,chest,layer,whale,minor,faith,tests,judge,items,worry,waste,hoped,strip,begun,aside,lakes,bound,depth,candy,event,worse,aware,shell,rooms,ranch,image,snake,aloud,dried,likes,motor,pound,knees,refer,fully,chain,shirt,flour,drops,spite,orbit,banks,shoot,curve,tribe,tight,blind,slept,shade,claim,flies,theme,queen,fifth,union,hence,straw,entry,issue,birth,feels,anger,brief,rhyme,glory,guard,flows,flesh,owned,trick,yours,sizes,noted,width,burst,route,lungs,uncle,bears,royal,kings,forty,trial,cards,brass,opera,chose,owner,vapor,beats,mouse,tough,wires,meter,tower,finds,inner,stuck,arrow,poems,label,swing,solar,truly,tense,beans,split,rises,weigh,hotel,stems,pride,swung,grade,digit,badly,boots,pilot,sales,swept,lucky,prize,stove,tubes,acres,wound,steep,slide,trunk,error,porch,slave,exist,faced,mines,marry,juice,raced,waved,goose,trust,fewer,favor,mills,views,joint,eager,spots,blend,rings,adult,index,nails,horns,balls,flame,rates,drill,trace,skins,waxed,seats,stuff,ratio,minds,dirty,silly,coins,hello,trips,leads,rifle,hopes,bases,shine,bench,moral,fires,meals,shake,shops,cycle,movie,slope,canoe,teams,folks,fired,bands,thumb,shout,canal,habit,reply,ruled,fever,crust,shelf,walks,midst,crack,print,tales,coach,stiff,flood,verse,awake,rocky,march,fault,swift,faint,civil,ghost,feast,blade,limit,germs,reads,ducks,dairy,worst,gifts,lists,stops,rapid,brick,claws,beads,beast,skirt,cakes,lions,frogs,tries,nerve,grand,armed,treat,honey,moist,legal,penny,crown,shock,taxes,sixty,altar,pulls,sport,drums,talks,dying,dates,drank,blows,lever,wages,proof,drugs,tanks,sings,tails,pause,herds,arose,hated,clues,novel,shame,burnt,races,flash,weary,heels,token,coats,spare,shiny,alarm,dimes,sixth,clerk,mercy,sunny,guest,float,shone,pipes,worms,bills,sweat,suits,smart,upset,rains,sandy,rainy,parks,sadly,fancy,rider,unity,bunch,rolls,crash,craft,newly,gates,hatch,paths,funds,wider,grace,grave,tides,admit,shift,sails,pupil,tiger,angel,cruel,agent,drama,urged,patch,nests,vital,sword,blame,weeds,screw,vocal,bacon,chalk,cargo,crazy,acted,goats,arise,witch,loves,queer,dwell,backs,ropes,shots,merry,phone,cheek,peaks,ideal,beard,eagle,creek,cries,ashes,stall,yield,mayor,opens,input,fleet,tooth,cubic,wives,burns,poets,apron,spear,organ,cliff,stamp,paste,rural,baked,chase,slice,slant,knock,noisy,sorts,stays,wiped,blown,piled,clubs,cheer,widow,twist,tenth,hides,comma,sweep,spoon,stern,crept,maple,deeds,rides,muddy,crime,jelly,ridge,drift,dusty,devil,tempo,humor,sends,steal,tents,waist,roses,reign,noble,cheap,dense,linen,geese,woven,posts,hired,wrath,salad,bowed,tires,shark,belts,grasp,blast,polar,fungi,tends,pearl,loads,jokes,veins,frost,hears,loses,hosts,diver,phase,toads,alert,tasks,seams,coral,focus,naked,puppy,jumps,spoil,quart,macro,fears,flung,spark,vivid,brook,steer,spray,decay,ports,socks,urban,goals,grant,minus,films,tunes,shaft,firms,skies,bride,wreck,flock,stare,hobby,bonds,dared,faded,thief,crude,pants,flute,votes,tonal,radar,wells,skull,hairs,argue,wears,dolls,voted,caves,cared,broom,scent,panel,fairy,olive,bends,prism,lamps,cable,peach,ruins,rally,schwa,lambs,sells,cools,draft,charm,limbs,brake,gazed,cubes,delay,beams,fetch,ranks,array,harsh,camel,vines,picks,naval,purse,rigid,crawl,toast,soils,sauce,basin,ponds,twins,wrist,fluid,pools,brand,stalk,robot,reeds,hoofs,buses,sheer,grief,bloom,dwelt,melts,risen,flags,knelt,fiber,roofs,freed,armor,piles,aimed,algae,twigs,lemon,ditch,drunk,rests,chill,slain,panic,cords,tuned,crisp,ledge,dived,swamp,clung,stole,molds,yarns,liver,gauge,breed,stool,gulls,awoke,gross,diary,rails,belly,trend,flask,stake,fried,draws,actor,handy,bowls,haste,scope,deals,knots,moons,essay,thump,hangs,bliss,dealt,gains,bombs,clown,palms,cones,roast,tidal,bored,chant,acids,dough,camps,swore,lover,hooks,males,cocoa,punch,award,reins,ninth,noses,links,drain,fills,nylon,lunar,pulse,flown,elbow,fatal,sites,moths,meats,foxes,mined,attic,fiery,mount,usage,swear,snowy,rusty,scare,traps,relax,react,valid,robin,cease,gills,prior,safer,polio,loyal,swell,salty,marsh,vague,weave,mound,seals,mules,virus,scout,acute,windy,stout,folds,seize,hilly,joins,pluck,stack,lords,dunes,burro,hawks,trout,feeds,scarf,halls,coals,towel,souls,elect,buggy,pumps,loans,spins,files,oxide,pains,photo,rival,flats,syrup,rodeo,sands,moose,pints,curly,comic,cloak,onion,clams,scrap,didst,couch,codes,fails,ounce,lodge,greet,gypsy,utter,paved,zones,fours,alley,tiles,bless,crest,elder,kills,yeast,erect,bugle,medal,roles,hound,snail,alter,ankle,relay,loops,zeros,bites,modes,debts,realm,glove,rayon,swims,poked,stray,lifts,maker,lumps,graze,dread,barns,docks,masts,pours,wharf,curse,plump,robes,seeks,cedar,curls,jolly,myths,cages,gloom,locks,pedal,beets,crows,anode,slash,creep,rowed,chips,fists,wines,cares,valve,newer,motel,ivory,necks,clamp,barge,blues,alien,frown,strap,crews,shack,gonna,saves,stump,ferry,idols,cooks,juicy,glare,carts,alloy,bulbs,lawns,lasts,fuels,oddly,crane,filed,weird,shawl,slips,troop,bolts,suite,sleek,quilt,tramp,blaze,atlas,odors,scrub,crabs,probe,logic,adobe,exile,rebel,grind,sting,spine,cling,desks,grove,leaps,prose,lofty,agony,snare,tusks,bulls,moods,humid,finer,dimly,plank,china,pines,guilt,sacks,brace,quote,lathe,gaily,fonts,scalp,adopt,foggy,ferns,grams,clump,perch,tumor,teens,crank,fable,hedge,genes,sober,boast,tract,cigar,unite,owing,thigh,haiku,swish,dikes,wedge,booth,eased,frail,cough,tombs,darts,forts,choir,pouch,pinch,hairy,buyer,torch,vigor,waltz,heats,herbs,users,flint,click,madam,bleak,blunt,aided,lacks,masks,waded,risks,nurse,chaos,sewed,cured,ample,lease,steak,sinks,merit,bluff,bathe,gleam,bonus,colts,shear,gland,silky,skate,birch,anvil,sleds,groan,maids,meets,speck,hymns,hints,drown,bosom,slick,quest,coils,spied,snows,stead,snack,plows,blond,tamed,thorn,waits,glued,banjo,tease,arena,bulky,carve,stunt,warms,shady,razor,folly,leafy,notch,fools,otter,pears,flush,genus,ached,fives,flaps,spout,smote,fumes,adapt,cuffs,tasty,stoop,clips,disks,sniff,lanes,brisk,imply,demon,super,furry,raged,growl,texts,hardy,stung,typed,hates,wiser,timid,serum,beaks,rotor,casts,baths,glide,plots,trait,resin,slums,lyric,puffs,decks,brood,mourn,aloft,abuse,whirl,edged,ovary,quack,heaps,slang,await,civic,saint,bevel,sonar,aunts,packs,froze,tonic,corps,swarm,frank,repay,gaunt,wired,niece,cello,needy,chuck,stony,media,surge,hurts,repel,husky,dated,hunts,mists,exert,dries,mates,sworn,baker,spice,oasis,boils,spurs,doves,sneak,paces,colon,siege,strum,drier,cacao,humus,bales,piped,nasty,rinse,boxer,shrub,amuse,tacks,cited,slung,delta,laden,larva,rents,yells,spool,spill,crush,jewel,snaps,stain,kicks,tying,slits,rated,eerie,smash,plums,zebra,earns,bushy,scary,squad,tutor,silks,slabs,bumps,evils,fangs,snout,peril,pivot,yacht,lobby,jeans,grins,viola,liner,comet,scars,chops,raids,eater,slate,skips,soles,misty,urine,knobs,sleet,holly,pests,forks,grill,trays,pails,borne,tenor,wares,carol,woody,canon,wakes,kitty,miner,polls,shaky,nasal,scorn,chess,taxis,crate,shyly,tulip,forge,nymph,budge,lowly,abide,depot,oases,asses,sheds,fudge,pills,rivet,thine,groom,lanky,boost,broth,heave,gravy,beech,timed,quail,inert,gears,chick,hinge,trash,clash,sighs,renew,bough,dwarf,slows,quill,shave,spore,sixes,chunk,madly,paced,braid,fuzzy,motto,spies,slack,mucus,magma,awful,discs,erase,posed,asset,cider,taper,theft,churn,satin,slots,taxed,bully,sloth,shale,tread,raked,curds,manor,aisle,bulge,loins,stair,tapes,leans,bunks,squat,towed,lance,panes,sakes,heirs,caste,dummy,pores,fauna,crook,poise,epoch,risky,warns,fling,berry,grape,flank,drags,squid,pelts,icing,irony,irons,barks,whoop,choke,diets,whips,tally,dozed,twine,kites,bikes,ticks,riots,roars,vault,looms,scold,blink,dandy,pupae,sieve,spike,ducts,lends,pizza,brink,widen,plumb,pagan,feats,bison,soggy,scoop,argon,nudge,skiff,amber,sexes,rouse,salts,hitch,exalt,leash,dined,chute,snort,gusts,melon,cheat,reefs,llama,lasso,debut,quota,oaths,prone,mixes,rafts,dives,stale,inlet,flick,pinto,brows,untie,batch,greed,chore,stirs,blush,onset,barbs,volts,beige,swoop,paddy,laced,shove,jerky,poppy,leaks,fares,dodge,godly,squaw,affix,brute,nicer,undue,snarl,merge,doses,showy,daddy,roost,vases,swirl,petty,colds,curry,cobra,genie,flare,messy,cores,soaks,ripen,whine,amino,plaid,spiny,mowed,baton,peers,vowed,pious,swans,exits,afoot,plugs,idiom,chili,rites,serfs,cleft,berth,grubs,annex,dizzy,hasty,latch,wasps,mirth,baron,plead,aloof,aging,pixel,bared,mummy,hotly,auger,buddy,chaps,badge,stark,fairs,gully,mumps,emery,filly,ovens,drone,gauze,idiot,fussy,annoy,shank,gouge,bleed,elves,roped,unfit,baggy,mower,scant,grabs,fleas,lousy,album,sawed,cooky,murky,infer,burly,waged,dingy,brine,kneel,creak,vanes,smoky,spurt,combs,easel,laces,humps,rumor,aroma,horde,swiss,leapt,opium,slime,afire,pansy,mares,soaps,husks,snips,hazel,lined,cafes,naive,wraps,sized,piers,beset,agile,tongs,steed,fraud,booty,valor,downy,witty,mossy,psalm,scuba,tours,polka,milky,gaudy,shrug,tufts,wilds,laser,truss,hares,creed,lilac,siren,tarry,bribe,swine,muted,flips,cures,sinew,boxed,hoops,gasps,hoods,niche,yucca,glows,sewer,whack,fuses,gowns,droop,bucks,pangs,mails,whisk,haven,clasp,sling,stint,urges,champ,piety,chirp,pleat,posse,sunup,menus,howls,quake,knack,plaza,fiend,caked,bangs,erupt,poker,olden,cramp,voter,poses,manly,slump,fined,grips,gaped,purge,hiked,maize,fluff,strut,sloop,prowl,roach,cocks,bland,dials,plume,slaps,soups,dully,wills,foams,solos,skier,eaves,totem,fused,latex,veils,mused,mains,myrrh,racks,galls,gnats,bouts,sisal,shuts,hoses,dryly,hover,gloss,seeps,denim,putty,guppy,leaky,dusky,filth,oboes,spans,fowls,adorn,glaze,haunt,dares,obeys,bakes,abyss,smelt,gangs,aches,trawl,claps,undid,spicy,hoist,fades,vicar,acorn,pussy,gruff,musty,tarts,snuff,hunch,truce,tweed,dryer,loser,sheaf,moles,lapse,tawny,vexed,autos,wager,domes,sheen,clang,spade,sowed,broil,slyly,studs,grunt,donor,slugs,aspen,homer,croak,tithe,halts,avert,havoc,hogan,glint,ruddy,jeeps,flaky,ladle,taunt,snore,fines,props,prune,pesos,radii,pokes,tiled,daisy,heron,villa,farce,binds,cites,fixes,jerks,livid,waked,inked,booms,chews,licks,hyena,scoff,lusty,sonic,smith,usher,tucks,vigil,molts,sects,spars,dumps,scaly,wisps,sores,mince,panda,flier,axles,plied,booby,patio,rabbi,petal,polyp,tints,grate,troll,tolls,relic,phony,bleat,flaws,flake,snags,aptly,drawl,ulcer,soapy,bossy,monks,crags,caged,twang,diner,taped,cadet,grids,spawn,guile,noose,mores,girth,slimy,aides,spasm,burrs,alibi,lymph,saucy,muggy,liter,joked,goofy,exams,enact,stork,lured,toxic,omens,nears,covet,wrung,forum,venom,moody,alder,sassy,flair,guild,prays,wrens,hauls,stave,tilts,pecks,stomp,gales,tempt,capes,mesas,omits,tepee,harry,wring,evoke,limes,cluck,lunge,highs,canes,giddy,lithe,verge,khaki,queue,loath,foyer,outdo,fared,deter,crumb,astir,spire,jumpy,extol,buoys,stubs,lucid,thong,afore,whiff,maxim,hulls,clogs,slats,jiffy,arbor,cinch,igloo,goody,gazes,dowel,calms,bitch,scowl,gulps,coded,waver,mason,lobes,ebony,flail,isles,clods,dazed,adept,oozed,sedan,clays,warts,ketch,skunk,manes,adore,sneer,mango,fiord,flora,roomy,minks,thaws,watts,freer,exult,plush,paled,twain,clink,scamp,pawed,grope,bravo,gable,stink,sever,waned,rarer,regal,wards,fawns,babes,unify,amend,oaken,glade,visor,hefty,nines,throb,pecan,butts,pence,sills,jails,flyer,saber,nomad,miter,beeps,domed,gulfs,curbs,heath,moors,aorta,larks,tangy,wryly,cheep,rages,evade,lures,freak,vogue,tunic,slams,knits,dumpy,mania,spits,firth,hikes,trots,nosed,clank,dogma,bloat,balsa,graft,middy,stile,keyed,finch,sperm,chaff,wiles,amigo,copra,amiss,eying,twirl,lurch,popes,chins,smock,tines,guise,grits,junks,shoal,cache,tapir,atoll,deity,toils,spree,mocks,scans,shorn,revel,raven,hoary,reels,scuff,mimic,weedy,corny,truer,rouge,ember,floes,torso,wipes,edict,sulky,recur,groin,baste,kinks,surer,piggy,moldy,franc,liars,inept,gusty,facet,jetty,equip,leper,slink,soars,cater,dowry,sided,yearn,decoy,taboo,ovals,heals,pleas,beret,spilt,gayly,rover,endow,pygmy,carat,abbey,vents,waken,chimp,fumed,sodas,vinyl,clout,wades,mites,smirk,bores,bunny,surly,frock,foray,purer,milks,query,mired,blare,froth,gruel,navel,paler,puffy,casks,grime,derby,mamma,gavel,teddy,vomit,moans,allot,defer,wield,viper,louse,erred,hewed,abhor,wrest,waxen,adage,ardor,stabs,pored,rondo,loped,fishy,bible,hires,foals,feuds,jambs,thuds,jeers,knead,quirk,rugby,expel,greys,rigor,ester,lyres,aback,glues,lotus,lurid,rungs,hutch,thyme,valet,tommy,yokes,epics,trill,pikes,ozone,caper,chime,frees,famed,leech,smite,neigh,erode,robed,hoard,salve,conic,gawky,craze,jacks,gloat,mushy,rumps,fetus,wince,pinks,shalt,toots,glens,cooed,rusts,stews,shred,parka,chugs,winks,clots,shrew,booed,filmy,juror,dents,gummy,grays,hooky,butte,dogie,poled,reams,fifes,spank,gayer,tepid,spook,taint,flirt,rogue,spiky,opals,miser,cocky,coyly,balmy,slosh,brawl,aphid,faked,hydra,brags,chide,yanks,allay,video,altos,eases,meted,chasm,longs,excel,taffy,impel,savor,koala,quays,dawns,proxy,clove,duets,dregs,tardy,briar,grimy,ultra,meaty,halve,wails,suede,mauve,envoy,arson,coves,gooey,brews,sofas,chums,amaze,zooms,abbot,halos,scour,suing,cribs,sagas,enema,wordy,harps,coupe,molar,flops,weeps,mints,ashen,felts,askew,munch,mewed,divan,vices,jumbo,blobs,blots,spunk,acrid,topaz,cubed,clans,flees,slurs,gnaws,welds,fords,emits,agate,pumas,mends,darks,dukes,plies,canny,hoots,oozes,lamed,fouls,clefs,nicks,mated,skims,brunt,tuber,tinge,fates,ditty,thins,frets,eider,bayou,mulch,fasts,amass,damps,morns,friar,palsy,vista,croon,conch,udder,tacos,skits,mikes,quits,preen,aster,adder,elegy,pulpy,scows,baled,hovel,lavas,crave,optic,welts,busts,knave,razed,shins,totes,scoot,dears,crock,mutes,trims,skein,doted,shuns,veers,fakes,yoked,wooed,hacks,sprig,wands,lulls,seers,snobs,nooks,pined,perky,mooed,frill,dines,booze,tripe,prong,drips,odder,levee,antic,sidle,pithy,corks,yelps,joker,fleck,buffs,scram,tiers,bogey,doled,irate,vales,coped,hails,elude,bulks,aired,vying,stags,strew,cocci,pacts,scabs,silos,dusts,yodel,terse,jaded,baser,jibes,foils,sways,forgo,slays,preys,treks,quell,peeks,assay,lurks,eject,boars,trite,belch,gnash,wanes,lutes,whims,dosed,chewy,snipe,umbra,teems,dozes,kelps,upped,brawn,doped,shush,rinds,slush,moron,voile,woken,fjord,sheik,jests,kayak,slews,toted,saner,drape,patty,raves,sulfa,grist,skied,vixen,civet,vouch,tiara,homey,moped,runts,serge,kinky,rills,corns,brats,pries,amble,fries,loons,tsars,datum,musky,pigmy,gnome,ravel,ovule,icily,liken,lemur,frays,silts,sifts,plods,ramps,tress,earls,dudes,waive,karat,jolts,peons,beers,horny,pales,wreak,lairs,lynch,stank,swoon,idler,abort,blitz,ensue,atone,bingo,roves,kilts,scald,adios,cynic,dulls,memos,elfin,dales,peels,peals,bares,sinus,crone,sable,hinds,shirk,enrol,wilts,roams,duped,cysts,mitts,safes,spats,coops,filet,knell,refit,covey,punks,kilns,fitly,abate,talcs,heeds,duels,wanly,ruffs,gauss,lapel,jaunt,whelp,cleat,gauzy,dirge,edits,wormy,moats,smear,prods,bowel,frisk,vests,bayed,rasps,tames,delve,embed,befit,wafer,ceded,novas,feign,spews,larch,huffs,doles,mamas,hulks,pried,brims,irked,aspic,swipe,mealy,skimp,bluer,slake,dowdy,penis,brays,pupas,egret,flunk,phlox,gripe,peony,douse,blurs,darns,slunk,lefts,chats,inane,vials,stilt,rinks,woofs,wowed,bongs,frond,ingot,evict,singe,shyer,flied,slops,dolts,drool,dells,whelk,hippy,feted,ether,cocos,hives,jibed,mazes,trios,sirup,squab,laths,leers,pasta,rifts,lopes,alias,whirs,diced,slags,lodes,foxed,idled,prows,plait,malts,chafe,cower,toyed,chefs,keels,sties,racer,etude,sucks,sulks,micas,czars,copse,ailed,abler,rabid,golds,croup,snaky,visas,palls,mopes,boned,wispy,raved,swaps,junky,doily,pawns,tamer,poach,baits,damns,gumbo,daunt,prank,hunks,buxom,heres,honks,stows,unbar,idles,routs,sages,goads,remit,copes,deign,culls,girds,haves,lucks,stunk,dodos,shams,snubs,icons,usurp,dooms,hells,soled,comas,paves,maths,perks,limps,wombs,blurb,daubs,cokes,sours,stuns,cased,musts,coeds,cowed,aping,zoned,rummy,fetes,skulk,quaff,rajah,deans,reaps,galas,tills,roved,kudos,toned,pared,scull,vexes,punts,snoop,bails,dames,hazes,lores,marts,voids,ameba,rakes,adzes,harms,rears,satyr,swill,hexes,colic,leeks,hurls,yowls,ivies,plops,musks,papaw,jells,bused,cruet,bided,filch,zests,rooks,laxly,rends,loams,basks,sires,carps,pokey,flits,muses,bawls,shuck,viler,lisps,peeps,sorer,lolls,prude,diked,floss,flogs,scums,dopes,bogie,pinky,leafs,tubas,scads,lowed,yeses,biked,qualm,evens,caned,gawks,whits,wooly,gluts,romps,bests,dunce,crony,joist,tunas,boner,malls,parch,avers,crams,pares,dally,bigot,kales,flays,leach,gushy,pooch,huger,slyer,golfs,mires,flues,loafs,arced,acnes,neons,fiefs,dints,dazes,pouts,cored,yules,lilts,beefs,mutts,fells,cowls,spuds,lames,jawed,dupes,deads,bylaw,noons,nifty,clued,vireo,gapes,metes,cuter,maims,droll,cupid,mauls,sedge,papas,wheys,eking,loots,hilts,meows,beaus,dices,peppy,riper,fogey,gists,yogas,gilts,skews,cedes,zeals,alums,okays,elope,grump,wafts,soots,blimp,hefts,mulls,hosed,cress,doffs,ruder,pixie,waifs,ousts,pucks,biers,gulch,suets,hobos,lints,brans,teals,garbs,pewee,helms,turfs,quips,wends,banes,napes,icier,swats,bagel,hexed,ogres,goner,gilds,pyres,lards,bides,paged,talon,flout,medic,veals,putts,dirks,dotes,tippy,blurt,piths,acing,barer,whets,gaits,wools,dunks,heros,swabs,dirts,jutes,hemps,surfs,okapi,chows,shoos,dusks,parry,decal,furls,cilia,sears,novae,murks,warps,slues,lamer,saris,weans,purrs,dills,togas,newts,meany,bunts,razes,goons,wicks,ruses,vends,geode,drake,judos,lofts,pulps,lauds,mucks,vises,mocha,oiled,roman,ethyl,gotta,fugue,smack,gourd,bumpy,radix,fatty,borax,cubit,cacti,gamma,focal,avail,papal,golly,elite,versa,billy,adieu,annum,howdy,rhino,norms,bobby,axiom,setup,yolks,terns,mixer,genre,knoll,abode,junta,gorge,combo,alpha,overt,kinda,spelt,prick,nobly,ephod,audio,modal,veldt,warty,fluke,bonny,bream,rosin,bolls,doers,downs,beady,motif,humph,fella,mould,crepe,kerns,aloha,glyph,azure,riser,blest,locus,lumpy,beryl,wanna,brier,tuner,rowdy,mural,timer,canst,krill,quoth,lemme,triad,tenon,amply,deeps,padre,leant,pacer,octal,dolly,trans,sumac,foamy,lolly,giver,quipu,codex,manna,unwed,vodka,ferny,salon,duple,boron,revue,crier,alack,inter,dilly,whist,cults,spake,reset,loess,decor,mover,verve,ethic,gamut,lingo,dunno,align,sissy,incur,reedy,avant,piper,waxer,calyx,basil,coons,seine,piney,lemma,trams,winch,whirr,saith,ionic,heady,harem,tummy,sally,shied,dross,farad,saver,tilde,jingo,bower,serif,facto,belle,inset,bogus,caved,forte,sooty,bongo,toves,credo,basal,yella,aglow,glean,gusto,hymen,ethos,terra,brash,scrip,swash,aleph,tinny,itchy,wanta,trice,jowls,gongs,garde,boric,twill,sower,henry,awash,libel,spurn,sabre,rebut,penal,obese,sonny,quirt,mebbe,tacit,greek,xenon,hullo,pique,roger,negro,hadst,gecko,beget,uncut,aloes,louis,quint,clunk,raped,salvo,diode,matey,hertz,xylem,kiosk,apace,cawed,peter,wench,cohos,sorta,gamba,bytes,tango,nutty,axial,aleck,natal,clomp,gored,siree,bandy,gunny,runic,whizz,rupee,fated,wiper,bards,briny,staid,hocks,ochre,yummy,gents,soupy,roper,swath,cameo,edger,spate,gimme,ebbed,breve,theta,deems,dykes,servo,telly,tabby,tares,blocs,welch,ghoul,vitae,cumin,dinky,bronc,tabor,teeny,comer,borer,sired,privy,mammy,deary,gyros,sprit,conga,quire,thugs,furor,bloke,runes,bawdy,cadre,toxin,annul,egged,anion,nodes,picky,stein,jello,audit,echos,fagot,letup,eyrie,fount,caped,axons,amuck,banal,riled,petit,umber,miler,fibre,agave,bated,bilge,vitro,feint,pudgy,mater,manic,umped,pesky,strep,slurp,pylon,puree,caret,temps,newel,yawns,seedy,treed,coups,rangy,brads,mangy,loner,circa,tibia,afoul,mommy,titer,carne,kooky,motes,amity,suave,hippo,curvy,samba,newsy,anise,imams,tulle,aways,liven,hallo,wales,opted,canto,idyll,bodes,curio,wrack,hiker,chive,yokel,dotty,demur,cusps,specs,quads,laity,toner,decry,writs,saute,clack,aught,logos,tipsy,natty,ducal,bidet,bulgy,metre,lusts,unary,goeth,baler,sited,shies,hasps,brung,holed,swank,looky,melee,huffy,loamy,pimps,titan,binge,shunt,femur,libra,seder,honed,annas,coypu,shims,zowie,jihad,savvy,nadir,basso,monic,maned,mousy,omega,laver,prima,picas,folio,mecca,reals,troth,testy,balky,crimp,chink,abets,splat,abaci,vaunt,cutie,pasty,moray,levis,ratty,islet,joust,motet,viral,nukes,grads,comfy,voila,woozy,blued,whomp,sward,metro,skeet,chine,aerie,bowie,tubby,emirs,coati,unzip,slobs,trike,funky,ducat,dewey,skoal,wadis,oomph,taker,minim,getup,stoic,synod,runty,flyby,braze,inlay,venue,louts,peaty,orlon,humpy,radon,beaut,raspy,unfed,crick,nappy,vizor,yipes,rebus,divot,kiwis,vetch,squib,sitar,kiddo,dyers,cotta,matzo,lager,zebus,crass,dacha,kneed,dicta,fakir,knurl,runny,unpin,julep,globs,nudes,sushi,tacky,stoke,kaput,butch,hulas,croft,achoo,genii,nodal,outgo,spiel,viols,fetid,cagey,fudgy,epoxy,leggy,hanky,lapis,felon,beefy,coots,melba,caddy,segue,betel,frizz,drear,kooks,turbo,hoagy,moult,helix,zonal,arias,nosey,paean,lacey,banns,swain,fryer,retch,tenet,gigas,whiny,ogled,rumen,begot,cruse,abuts,riven,balks,sines,sigma,abase,ennui,gores,unset,augur,sated,odium,latin,dings,moire,scion,henna,kraut,dicks,lifer,prigs,bebop,gages,gazer,fanny,gibes,aural,tempi,hooch,rapes,snuck,harts,techs,emend,ninny,guava,scarp,liege,tufty,sepia,tomes,carob,emcee,prams,poser,verso,hubba,joule,baize,blips,scrim,cubby,clave,winos,rearm,liens,lumen,chump,nanny,trump,fichu,chomp,homos,purty,maser,woosh,patsy,shill,rusks,avast,swami,boded,ahhhh,lobed,natch,shish,tansy,snoot,payer,altho,sappy,laxer,hubby,aegis,riles,ditto,jazzy,dingo,quasi,septa,peaky,lorry,heerd,bitty,payee,seamy,apses,imbue,belie,chary,spoof,phyla,clime,babel,wacky,sumps,skids,khans,crypt,inure,nonce,outen,faire,hooey,anole,kazoo,calve,limbo,argot,ducky,faker,vibes,gassy,unlit,nervy,femme,biter,fiche,boors,gaffe,saxes,recap,synch,facie,dicey,ouija,hewer,legit,gurus,edify,tweak,caron,typos,rerun,polly,surds,hamza,nulls,hater,lefty,mogul,mafia,debug,pates,blabs,splay,talus,porno,moola,nixed,kilos,snide,horsy,gesso,jaggy,trove,nixes,creel,pater,iotas,cadge,skyed,hokum,furze,ankhs,curie,nutsy,hilum,remix,angst,burls,jimmy,veiny,tryst,codon,befog,gamed,flume,axman,doozy,lubes,rheas,bozos,butyl,kelly,mynah,jocks,donut,avian,wurst,chock,quash,quals,hayed,bombe,cushy,spacy,puked,leery,thews,prink,amens,tesla,intro,fiver,frump,capos,opine,coder,namer,jowly,pukes,haled,chard,duffs,bruin,reuse,whang,toons,frats,silty,telex,cutup,nisei,neato,decaf,softy,bimbo,adlib,loony,shoed,agues,peeve,noway,gamey,sarge,reran,epact,potty,coned,upend,narco,ikats,whorl,jinks,tizzy,weepy,posit,marge,vegan,clops,numbs,reeks,rubes,rower,biped,tiffs,hocus,hammy,bunco,fixit,tykes,chaws,yucky,hokey,resew,maven,adman,scuzz,slogs,souse,nacho,mimed,melds,boffo,debit,pinup,vagus,gulag,randy,bosun,educe,faxes,auras,pesto,antsy,betas,fizzy,dorky,snits,moxie,thane,mylar,nobby,gamin,gouty,esses,goyim,paned,druid,jades,rehab,gofer,tzars,octet,homed,socko,dorks,eared,anted,elide,fazes,oxbow,dowse,situs,macaw,scone,drily,hyper,salsa,mooch,gated,unjam,lipid,mitre,venal,knish,ritzy,divas,torus,mange,dimer,recut,meson,wined,fends,phage,fiats,caulk,cavil,panty,roans,bilks,hones,botch,estop,sully,sooth,gelds,ahold,raper,pager,fixer,infix,hicks,tuxes,plebe,twits,abash,twixt,wacko,primp,nabla,girts,miffs,emote,xerox,rebid,shahs,rutty,grout,grift,deify,biddy,kopek,semis,bries,acmes,piton,hussy,torts,disco,whore,boozy,gibed,vamps,amour,soppy,gonzo,durst,wader,tutus,perms,catty,glitz,brigs,nerds,barmy,gizmo,owlet,sayer,molls,shard,whops,comps,corer,colas,matte,droid,ploys,vapid,cairn,deism,mixup,yikes,prosy,raker,flubs,whish,reify,craps,shags,clone,hazed,macho,recto,refix,drams,biker,aquas,porky,doyen,exude,goofs,divvy,noels,jived,hulky,cager,harpy,oldie,vivas,admix,codas,zilch,deist,orcas,retro,pilaf,parse,rants,zingy,toddy,chiff,micro,veeps,girly,nexus,demos,bibbs,antes,lulus,gnarl,zippy,ivied,epees,wimps,tromp,grail,yoyos,poufs,hales,roust,cabal,rawer,pampa,mosey,kefir,burgs,unmet,cuspy,boobs,boons,hypes,dynes,nards,lanai,yogis,sepal,quark,toked,prate,ayins,hawed,swigs,vitas,toker,doper,bossa,linty,foist,mondo,stash,kayos,twerp,zesty,capon,wimpy,rewed,fungo,tarot,frosh,kabob,pinko,redid,mimeo,heist,tarps,lamas,sutra,dinar,whams,busty,spays,mambo,nabob,preps,odour,cabby,conks,sluff,dados,houri,swart,balms,gutsy,faxed,egads,pushy,retry,agora,drubs,daffy,chits,mufti,karma,lotto,toffs,burps,deuce,zings,kappa,clads,doggy,duper,scams,ogler,mimes,throe,zetas,waled,promo,blats,muffs,oinks,viand,coset,finks,faddy,minis,snafu,sauna,usury,muxes,craws,stats,condo,coxes,loopy,dorms,ascot,dippy,execs,dopey,envoi,umpty,gismo,fazed,strop,jives,slims,batik,pings,sonly,leggo,pekoe,prawn,luaus,campy,oodle,prexy,proms,touts,ogles,tweet,toady,naiad,hider,nuked,fatso,sluts,obits,narcs,tyros,delis,wooer,hyped,poset,byway,texas,scrod,avows,futon,torte,tuple,carom,kebab,tamps,jilts,duals,artsy,repro,modem,toped,psych,sicko,klutz,tarns,coxed,drays,cloys,anded,piker,aimer,suras,limos,flack,hapax,dutch,mucky,shire,klieg,staph,layup,tokes,axing,toper,duvet,cowry,profs,blahs,addle,sudsy,batty,coifs,suety,gabby,hafta,pitas,gouda,deice,taupe,topes,duchy,nitro,carny,limey,orals,hirer,taxer,roils,ruble,elate,dolor,wryer,snots,quais,coked,gimel,gorse,minas,goest,agape,manta,jings,iliac,admen,offen,cills,offal,lotta,bolas,thwap,alway,boggy,donna,locos,belay,gluey,bitsy,mimsy,hilar,outta,vroom,fetal,raths,renal,dyads,crocs,vires,culpa,kivas,feist,teats,thats,yawls,whens,abaca,ohhhh,aphis,fusty,eclat,perdu,mayst,exeat,molly,supra,wetly,plasm,buffa,semen,pukka,tagua,paras,stoat,secco,carte,haute,molal,shads,forma,ovoid,pions,modus,bueno,rheum,scurf,parer,ephah,doest,sprue,flams,molto,dieth,choos,miked,bronx,goopy,bally,plumy,moony,morts,yourn,bipod,spume,algal,ambit,mucho,spued,dozer,harum,groat,skint,laude,thrum,pappy,oncet,rimed,gigue,limed,plein,redly,humpf,lites,seest,grebe,absit,thanx,pshaw,yawps,plats,payed,areal,tilth,youse,gwine,thees,watsa,lento,spitz,yawed,gipsy,sprat,cornu,amahs,blowy,wahoo,lubra,mecum,whooo,coqui,sabra,edema,mrads,dicot,astro,kited,ouzel,didos,grata,bonne,axmen,klunk,summa,laves,purls,yawny,teary,masse,largo,bazar,pssst,sylph,lulab,toque,fugit,plunk,ortho,lucre,cooch,whipt,folky,tyres,wheee,corky,injun,solon,didot,kerfs,rayed,wassa,chile,begat,nippy,litre,magna,rebox,hydro,milch,brent,gyves,lazed,feued,mavis,inapt,baulk,casus,scrum,wised,fossa,dower,kyrie,bhoys,scuse,feuar,ohmic,juste,ukase,beaux,tusky,orate,musta,lardy,intra,quiff,epsom,neath,ocher,tared,homme,mezzo,corms,psoas,beaky,terry,infra,spivs,tuans,belli,bergs,anima,weirs,mahua,scops,manse,titre,curia,kebob,cycad,talky,fucks,tapis,amide,dolce,sloes,jakes,russe,blash,tutti,pruta,panga,blebs,tench,swarf,herem,missy,merse,pawky,limen,vivre,chert,unsee,tiros,brack,foots,welsh,fosse,knops,ileum,noire,firma,podgy,laird,thunk,shute,rowan,shoji,poesy,uncap,fames,glees,costa,turps,fores,solum,imago,byres,fondu,coney,polis,dictu,kraal,sherd,mumbo,wroth,chars,unbox,vacuo,slued,weest,hades,wiled,syncs,muser,excon,hoars,sibyl,passe,joeys,lotsa,lepta,shays,bocks,endue,darer,nones,ileus,plash,busby,wheal,buffo,yobbo,biles,poxes,rooty,licit,terce,bromo,hayey,dweeb,imbed,saran,bruit,punky,softs,biffs,loppy,agars,aquae,livre,biome,bunds,shews,diems,ginny,degum,polos,desex,unman,dungy,vitam,wedgy,glebe,apers,ridgy,roids,wifey,vapes,whoas,bunko,yolky,ulnas,reeky,bodge,brant,davit,deque,liker,jenny,tacts,fulls,treap,ligne,acked,refry,vower,aargh,churl,momma,gaols,whump,arras,marls,tiler,grogs,memes,midis,tided,haler,duces,twiny,poste,unrig,prise,drabs,quids,facer,spier,baric,geoid,remap,trier,gunks,steno,stoma,airer,ovate,torah,apian,smuts,pocks,yurts,exurb,defog,nuder,bosky,nimbi,mothy,joyed,labia,pards,jammy,bigly,faxer,hoppy,nurbs,cotes,dishy,vised,celeb,pismo,casas,withs,dodgy,scudi,mungs,muons,ureas,ioctl,unhip,krone,sager,verst,expat,gronk,uvula,shawm,bilgy,braes,cento,webby,lippy,gamic,lordy,mazed,tings,shoat,faery,wirer,diazo,carer,rater,greps,rente,zloty,viers,unapt,poops,fecal,kepis,taxon,eyers,wonts,spina,stoae,yenta,pooey,buret,japan,bedew,hafts,selfs,oared,herby,pryer,oakum,dinks,titty,sepoy,penes,fusee,winey,gimps,nihil,rille,giber,ousel,umiak,cuppy,hames,shits,azine,glads,tacet,bumph,coyer,honky,gamer,gooky,waspy,sedgy,bents,varia,djinn,junco,pubic,wilco,lazes,idyls,lupus,rives,snood,schmo,spazz,finis,noter,pavan,orbed,bates,pipet,baddy,goers,shako,stets,sebum,seeth,lobar,raver,ajuga,riced,velds,dribs,ville,dhows,unsew,halma,krona,limby,jiffs,treys,bauds,pffft,mimer,plebs,caner,jiber,cuppa,washy,chuff,unarm,yukky,styes,waker,flaks,maces,rimes,gimpy,guano,liras,kapok,scuds,bwana,oring,aider,prier,klugy,monte,golem,velar,firer,pieta,umbel,campo,unpeg,fovea,abeam,boson,asker,goths,vocab,vined,trows,tikis,loper,indie,boffs,spang,grapy,tater,ichor,kilty,lochs,supes,degas,flics,torsi,beths,weber,resaw,lawny,coven,mujik,relet,therm,heigh,shnor,trued,zayin,liest,barfs,bassi,qophs,roily,flabs,punny,okras,hanks,dipso,nerfs,fauns,calla,pseud,lurer,magus,obeah,atria,twink,palmy,pocky,pends,recta,plonk,slaws,keens,nicad,pones,inker,whews,groks,mosts,trews,ulnar,gyppy,cocas,expos,eruct,oiler,vacua,dreck,dater,arums,tubal,voxel,dixit,beery,assai,lades,actin,ghoti,buzzy,meads,grody,ribby,clews,creme,email,pyxie,kulak,bocci,rived,duddy,hoper,lapin,wonks,petri,phial,fugal,holon,boomy,duomo,musos,shier,hayer,porgy,hived,litho,fisty,stagy,luvya,maria,smogs,asana,yogic,slomo,fawny,amine,wefts,gonad,twirp,brava,plyer,fermi,loges,niter,revet,unate,gyved,totty,zappy,honer,giros,dicer,calks,luxes,monad,cruft,quoin,fumer,amped,shlep,vinca,yahoo,vulva,zooey,dryad,nixie,moper,iambs,lunes,nudie,limns,weals,nohow,miaow,gouts,mynas,mazer,kikes,oxeye,stoup,jujus,debar,pubes,taels,defun,rands,blear,paver,goosy,sprog,oleos,toffy,pawer,maced,crits,kluge,tubed,sahib,ganef,scats,sputa,vaned,acned,taxol,plink,oweth,tribs,resay,boule,thous,haply,glans,maxis,bezel,antis,porks,quoit,alkyd,glary,beamy,hexad,bonks,tecum,kerbs,filar,frier,redux,abuzz,fader,shoer,couth,trues,guyed,goony,booky,fuzes,hurly,genet,hodad,calix,filer,pawls,iodic,utero,henge,unsay,liers,piing,weald,sexed,folic,poxed,cunts,anile,kiths,becks,tatty,plena,rebar,abled,toyer,attar,teaks,aioli,awing,anent,feces,redip,wists,prats,mesne,muter,smurf,owest,bahts,lossy,ftped,hunky,hoers,slier,sicks,fatly,delft,hiver,himbo,pengo,busks,loxes,zonks,ilium,aport,ikons,mulct,reeve,civvy,canna,barfy,kaiak,scudo,knout,gaper,bhang,pease,uteri,lases,paten,rasae,axels,stoas,ombre,styli,gunky,hazer,kenaf,ahoys,ammos,weeny,urger,kudzu,paren,bolos,fetor,nitty,techy,lieth,somas,darky,villi,gluon,janes,cants,farts,socle,jinns,ruing,slily,ricer,hadda,wowee,rices,nerts,cauls,swive,lilty,micks,arity,pasha,finif,oinky,gutty,tetra,wises,wolds,balds,picot,whats,shiki,bungs,snarf,legos,dungs,stogy,berms,tangs,vails,roods,morel,sware,elans,latus,gules,razer,doxie,buena,overs,gutta,zincs,nates,kirks,tikes,donee,jerry,mohel,ceder,doges,unmap,folia,rawly,snark,topoi,ceils,immix,yores,diest,bubba,pomps,forky,turdy,lawzy,poohs,worts,gloms,beano,muley,barky,tunny,auric,funks,gaffs,cordy,curdy,lisle,toric,soyas,reman,mungy,carpy,apish,oaten,gappy,aurae,bract,rooky,axled,burry,sizer,proem,turfy,impro,mashy,miens,nonny,olios,grook,sates,agley,corgi,dashy,doser,dildo,apsos,xored,laker,playa,selah,malty,dulse,frigs,demit,whoso,rials,sawer,spics,bedim,snugs,fanin,azoic,icers,suers,wizen,koine,topos,shirr,rifer,feral,laded,lased,turds,swede,easts,cozen,unhit,pally,aitch,sedum,coper,ruche,geeks,swags,etext,algin,offed,ninja,holer,doter,toter,besot,dicut,macer,peens,pewit,redox,poler,yecch,fluky,doeth,twats,cruds,bebug,bider,stele,hexer,wests,gluer,pilau,abaft,whelm,lacer,inode,tabus,gator,cuing,refly,luted,cukes,bairn,bight,arses,crump,loggy,blini,spoor,toyon,harks,wazoo,fenny,naves,keyer,tufas,morph,rajas,typal,spiff,oxlip,unban,mussy,finny,rimer,login,molas,cirri,huzza,agone,unsex,unwon,peats,toile,zombi,dewed,nooky,alkyl,ixnay,dovey,holey,cuber,amyls,podia,chino,apnea,prims,lycra,johns,primo,fatwa,egger,hempy,snook,hying,fuzed,barms,crink,moots,yerba,rhumb,unarc,direr,munge,eland,nares,wrier,noddy,atilt,jukes,ender,thens,unfix,doggo,zooks,diddy,shmoo,brusk,prest,curer,pasts,kelpy,bocce,kicky,taros,lings,dicky,nerdy,abend,stela,biggy,laved,baldy,pubis,gooks,wonky,stied,hypos,assed,spumy,osier,roble,rumba,biffy,pupal');
var $author$project$Words$french = A2($elm$core$String$split, ',', 'abats,abbes,abces,abeti,abima,abime,aboie,abois,aboli,abord,abots,about,aboya,aboye,abris,abusa,abuse,acces,accot,accru,accus,acera,acere,achat,acide,acier,acini,acmes,acnes,acons,acore,acres,actai,actas,actat,actee,acter,actes,actez,actif,adage,adent,adieu,admet,admis,admit,adnee,adnes,adora,adore,adret,adula,adule,aedes,aequo,aerai,aeras,aerat,aeree,aerer,aeres,aerez,affin,affut,agaca,agace,agami,agape,agate,agave,agees,agent,aghas,agile,agios,agira,agita,agite,agnat,agora,agrea,agree,agres,aguis,ahana,ahane,ahans,ahuri,aiche,aidai,aidas,aidat,aidee,aider,aides,aidez,aient,aieul,aieux,aigle,aigre,aigri,aigue,aigus,ailee,ailes,ailla,aille,aimai,aimas,aimat,aimee,aimer,aimes,aimez,ainee,aines,ainsi,aioli,airai,airas,airat,airer,aires,airez,aisee,aises,aisys,ajonc,ajour,ajout,album,aldin,aldol,aleas,alene,aleph,alesa,alese,alfas,algie,algol,algue,alias,alibi,alios,alise,alita,alite,alize,allai,allas,allat,allee,aller,alles,allez,allia,allie,almee,aloes,alors,alose,alpax,alpes,alpha,alpin,altos,aluna,alune,aluni,aluns,alvin,alyte,amant,amati,ambla,amble,ambon,ambra,ambre,amena,amene,amere,amers,amibe,amict,amide,amies,amine,amont,amour,amphi,ample,ampli,amuie,amuis,amura,amure,amusa,amuse,amyle,anale,anaux,anche,ancra,ancre,andin,aneth,anges,angle,angon,angor,anier,anima,anime,anion,anisa,anise,annal,annee,anode,anons,ansee,anses,antan,antes,antre,aorte,aouta,aoute,aphte,apiol,apion,aplat,apnee,apode,appas,appat,appel,appui,apres,aptes,apura,apure,arabe,arasa,arase,arbre,arche,arcon,ardue,ardus,arecs,arene,arete,argas,argon,argot,argua,argue,argus,arias,aride,arien,arisa,arise,armai,armas,armat,armee,armer,armes,armet,armez,armon,arome,arqua,arque,arret,arsin,artel,arums,aryen,aryle,asile,aspes,aspic,asque,assai,asses,assez,assis,assit,aster,astis,astre,atele,athee,atlas,atoll,atome,atone,atour,atout,aubes,aubin,aucun,audio,audit,auges,auget,aulne,aunes,aurai,auras,aurez,aussi,autel,autos,autre,avais,avait,avala,avale,avals,avant,avare,avens,avenu,avera,avere,avers,aveux,avide,aviez,avili,avina,avine,avion,avisa,avise,aviso,aviva,avive,avoir,avons,avoua,avoue,avril,axais,axait,axant,axees,axent,axera,axiez,axile,axone,axons,ayant,ayons,azote,azura,azure,azurs,azyme,babas,babil,babys,bacha,bache,bacla,bacle,bacon,bacul,badge,badin,baffa,baffe,bafra,bafre,bagad,bagne,bagou,bagua,bague,bahut,baies,bains,baisa,baise,balai,bales,balla,balle,balsa,balte,banal,banco,bancs,banda,bande,bangs,banjo,banna,banne,banni,barba,barbe,barbu,barda,barde,bards,barge,baril,barns,baron,barra,barre,barri,barye,basai,basal,basas,basat,basee,baser,bases,basez,basic,basin,basse,baste,batai,batas,batat,batee,bater,bates,batez,batie,batik,batir,batis,batit,baton,batte,battu,bauds,bauge,baume,bavai,bavas,bavat,baver,baves,bavez,bayai,bayas,bayat,bayer,bayes,bayez,bayou,bazar,beais,beait,beant,beate,beats,beauf,beaux,bebes,becha,beche,becot,becta,becte,bedon,beent,beera,begue,begum,beiez,beige,bekes,belai,belas,belat,belee,beler,beles,belez,belge,belle,belon,bemol,benef,benet,benie,benin,benir,benis,benit,benne,beons,bequa,beque,berca,berce,beret,berge,berme,berna,berne,beryl,besef,betas,betel,betes,beton,bette,beurs,bevue,biais,bibis,bible,bicha,biche,bicot,bides,bidet,bidon,biefs,biens,biere,biffa,biffe,bigla,bigle,bigot,bigre,bigue,bijou,bilai,bilan,bilas,bilat,bilee,biler,biles,bilez,bille,bills,binai,binas,binat,binee,biner,bines,binez,bingo,bique,birbe,bisai,bisas,bisat,bisee,biser,bises,biset,bisez,bison,bisou,bissa,bisse,bitai,bitas,bitat,bitee,biter,bites,bitez,bitos,bitta,bitte,bizut,black,blair,blama,blame,blanc,blaps,blasa,blase,bleds,bleme,blemi,blesa,blese,blets,bleue,bleui,bleus,blocs,blond,blues,bluet,bluff,bluta,blute,bobos,bocal,boche,bocks,boete,boeuf,bogie,bogue,boira,boire,boisa,boise,boita,boite,boive,boldo,bolee,bolet,bomba,bombe,bomes,bonda,bonde,bondi,bonds,bonis,bonne,bonte,bonus,bonze,booms,boots,boras,borax,borda,borde,bords,bores,borna,borne,borts,bosco,bossa,bosse,bossu,botes,botta,botte,boucs,bouda,boude,bouee,boues,bouge,bouif,boula,boule,boume,bourg,bouse,bouta,boute,bouts,bovin,boxai,boxas,boxat,boxee,boxer,boxes,boxez,boyau,brada,brade,braie,brais,brait,brama,brame,brans,brasa,brase,brava,brave,bravo,braya,braye,break,brefs,brela,brele,breme,breve,brick,brida,bride,bries,brifa,brife,brima,brime,brins,brios,brisa,brise,brocs,broda,brode,broie,brome,brook,broum,brous,brout,broya,broye,bruie,bruir,bruis,bruit,brula,brule,bruma,brume,brune,bruni,bruns,brute,bruts,bubon,bucha,buche,buees,buggy,bugle,buire,bulbe,bulle,bumes,bures,burin,buron,buscs,buses,busse,buste,butai,butas,butat,butee,buter,butes,butez,butin,butor,butta,butte,buvee,buvez,caban,cabas,cabla,cable,cabot,cabra,cabre,cabri,cabus,cacao,cacas,cacha,cache,caddy,cades,cadet,cadis,cadra,cadre,caduc,cafes,cafre,cafta,cafte,cages,caget,cagna,cagne,cagot,cahot,caids,caieu,cairn,cajou,cajun,cakes,calai,calao,calas,calat,calee,caler,cales,calez,calfs,calin,calma,calme,calmi,calos,calot,calta,calte,calva,camee,cames,campa,campe,camps,camus,canai,canal,canas,canat,candi,caner,canes,canez,canif,canin,canna,canne,canoe,canon,canot,canut,caoua,capea,capee,capes,capon,capot,cappa,capre,capta,capte,caqua,caque,carat,carda,carde,carex,cargo,caria,carie,caris,carma,carme,carne,carpe,carra,carre,carry,carte,casai,casas,casat,casee,caser,cases,casez,cassa,casse,caste,catch,catin,catis,cauri,causa,cause,cavai,cavas,cavat,cavee,caver,caves,cavet,cavez,ceans,cedai,cedas,cedat,cedee,ceder,cedes,cedex,cedez,cedre,ceins,ceint,celai,celas,celat,celee,celer,celes,celez,cella,celle,celte,celui,cenes,cense,cents,cepes,cerat,cerce,cerfs,cerna,cerne,cesar,cessa,cesse,ceste,cette,chahs,chair,chais,chale,champ,chant,chaos,chape,chars,chats,chaud,chaut,chaux,chefs,cheik,chene,chenu,chera,chere,cheri,chers,chiai,chias,chiat,chics,chiee,chien,chier,chies,chiez,china,chine,chiot,chipa,chipe,chips,chocs,choie,choir,chois,choit,choix,choma,chome,chopa,chope,chose,chott,choux,choya,choye,chues,chuta,chute,chyle,chyme,cible,cidre,ciels,cieux,cigue,cilie,cilla,cille,cimes,cines,cippe,cirai,ciras,cirat,ciree,cirer,cires,cirez,ciron,cirre,ciste,citai,citas,citat,citee,citer,cites,citez,civet,civil,clade,claie,clair,clama,clame,clamp,clams,clans,clapa,clape,clapi,clava,clave,clebs,clefs,clerc,clics,clins,clips,cliva,clive,clodo,clone,clope,clora,clore,close,cloua,cloue,clous,clown,clubs,cluse,coach,coati,cobea,cobol,cobra,cocas,cocha,coche,cocon,cocos,cocus,codai,codas,codat,codee,coder,codes,codex,codez,codon,coeur,cogna,cogne,cohue,coing,coins,coita,coite,coits,colin,colis,colla,colle,colon,colts,colza,comas,combe,comma,comme,comte,concu,conde,cones,conga,conge,conie,conir,conis,conit,connu,conta,conte,copal,copia,copie,copra,copte,coqua,coque,coran,corda,corde,corna,corne,cornu,coron,corps,corsa,corse,cossa,cosse,cossu,cosys,cotai,cotas,cotat,cotee,coter,cotes,cotez,cotie,cotir,cotis,cotit,coton,cotte,couac,couda,coude,couds,couic,coula,coule,coupa,coupe,coups,coure,cours,court,couru,couse,cousu,couta,coute,couts,couva,couve,coxal,coyau,crabe,crack,crado,craie,crama,crame,crana,crane,crans,crase,crash,crave,crawl,creai,creas,creat,credo,creee,creer,crees,creez,crema,creme,crena,crene,crepa,crepe,crepi,crepu,crete,creux,creva,creve,criai,crias,criat,crics,criee,crier,cries,criez,crime,crins,crise,crocs,croie,crois,croit,croix,cross,cruel,crues,cubai,cubas,cubat,cubee,cuber,cubes,cubez,cuira,cuire,cuirs,cuise,cuita,cuite,cuits,culai,culas,culat,culee,culer,cules,culex,culez,culot,culte,cumin,cumul,curai,curas,curat,curee,curer,cures,curez,curry,cuvai,cuvas,cuvat,cuvee,cuver,cuves,cuvez,cyans,cycas,cycle,cygne,czars,dadas,dagua,dague,dahir,daims,daine,dalla,dalle,dalot,damai,daman,damas,damat,damee,damer,dames,damez,damna,damne,dandy,dansa,danse,darce,darda,darde,dards,darne,darse,datai,datas,datat,datee,dater,dates,datez,datif,datte,dauba,daube,debat,debet,debit,debut,decan,decas,deces,deche,dechu,decis,decor,decri,decru,decue,decus,decut,dedia,dedie,dedis,dedit,defia,defie,defis,defit,degat,degel,degre,deite,delai,delco,delia,delie,delit,delot,delta,demes,demet,demie,demis,demit,demon,denia,denie,denis,dense,dente,dents,denua,denue,depit,deplu,depot,derby,derme,derny,desir,dette,deuil,devet,devez,devia,devie,devin,devis,devot,devra,diane,diapo,dicos,dicta,dicte,diese,diete,dieux,diffa,digit,digne,digon,digue,dilua,dilue,dimes,dinai,dinar,dinas,dinat,dinde,diner,dines,dinez,dingo,diode,dirai,diras,direz,disco,dises,disse,dites,divan,divas,divin,divis,djain,djinn,docks,docte,dodos,dodue,dodus,doges,dogme,dogue,doigt,doive,dolai,dolas,dolat,dolce,dolee,doler,doles,dolez,dolic,domes,donna,donne,dopai,dopas,dopat,dopee,doper,dopes,dopez,dorai,doras,dorat,doree,dorer,dores,dorez,doris,dorme,dormi,dosai,dosas,dosat,dosee,doser,doses,dosez,dosse,dotai,dotal,dotas,dotat,dotee,doter,dotes,dotez,douai,douar,douas,douat,douce,douci,douee,douer,doues,douez,doums,douro,douta,doute,douve,douze,doyen,draie,drain,drame,drapa,drape,draps,drave,draya,draye,drege,drill,dring,drink,driva,drive,droit,drole,dropa,drope,drops,drues,drupe,duale,duaux,ducal,ducat,duces,duche,duels,duite,duits,dulie,dumes,dunes,duodi,dupai,dupas,dupat,dupee,duper,dupes,dupez,durai,duras,durat,durci,duree,durer,dures,durez,durit,dusse,dutes,duvet,dyade,dzeta,ebahi,ebats,ebene,eboua,eboue,ecala,ecale,ecang,ecart,ecati,echec,eches,echos,echue,echus,echut,ecima,ecime,eclat,eclos,eclot,ecole,ecopa,ecope,ecora,ecore,ecote,ecots,ecran,ecrie,ecrin,ecris,ecrit,ecrou,ecrue,ecrus,ecula,ecule,ecuma,ecume,ecura,ecure,edams,edens,edile,edita,edite,edits,effet,egaie,egala,egale,egara,egard,egare,egaux,egaya,egaye,egeen,egide,egout,eider,elans,elave,elbot,elegi,eleis,eleva,eleve,elfes,elida,elide,elima,elime,elira,elire,elise,elite,elles,eloge,eluda,elude,elues,email,emana,emane,emaux,embat,embua,embue,embus,emeri,emets,emeus,emeut,emiai,emias,emiat,emiee,emier,emies,emiez,emirs,emise,emois,emoud,emous,empan,empli,emues,emula,emule,encan,encas,encra,encre,endos,enfer,enfeu,enfin,enfla,enfle,enfui,engin,enjeu,enlia,enlie,ennui,enoua,enoue,entai,entas,entat,entee,enter,entes,entez,entra,entre,envia,envie,envoi,envol,epair,epais,epala,epale,epand,epars,epata,epate,epave,epees,epela,epele,ephod,epiai,epias,epiat,epica,epice,epiee,epier,epies,epieu,epiez,epige,epila,epile,epina,epine,epite,epode,epoux,epris,epuca,epuce,epura,epure,equin,eraie,eraya,eraye,ergot,erige,erine,eroda,erode,errai,erras,errat,errer,erres,errez,escha,esche,escot,espar,essai,esses,essor,ester,estoc,etage,etaie,etain,etais,etait,etala,etale,etals,etama,etame,etang,etant,etape,etats,etaux,etaya,etaye,etend,eteta,etete,eteuf,ether,etier,etiez,etira,etire,etocs,etole,etres,etron,etude,etuis,etuva,etuve,eumes,euros,eusse,eutes,evade,evasa,evase,eveil,event,evida,evide,evier,evita,evite,evohe,exact,exces,exclu,exige,exigu,exila,exile,exils,exode,expia,expie,extra,fable,faces,facha,fache,facho,facon,facto,fadai,fadas,fadat,fadee,fader,fades,fadez,fados,fagne,fagot,faims,faine,faire,faite,faits,fakir,fallu,falot,falun,famee,fames,fanai,fanal,fanas,fanat,fanee,faner,fanes,fanez,fange,fanon,faons,farad,farce,farci,farda,farde,fards,faros,farta,farte,farts,fasce,fasse,faste,fatal,fatma,fatum,faune,fauta,faute,fauve,favus,faxai,faxas,faxat,faxee,faxer,faxes,faxez,fayot,feale,feaux,fecal,feces,feins,feint,felai,felas,felat,felee,feler,feles,felez,felin,felon,femme,femur,fende,fends,fendu,fenil,fente,ferai,feras,ferez,ferie,ferla,ferle,ferma,ferme,ferra,ferre,ferry,ferue,ferus,fessa,fesse,fessu,fetai,fetas,fetat,fetee,feter,fetes,fetez,fetus,feues,feuil,feula,feule,feves,fiais,fiait,fiant,fibre,ficha,fiche,fichu,ficus,fiees,fiefs,fiels,fient,fiera,fiere,fiers,fieux,fifre,figea,figee,figer,figes,figez,figue,fiiez,filai,filas,filat,filee,filer,files,filet,filez,filin,fille,filma,filme,films,filon,filou,fimes,final,fines,finie,finir,finis,finit,fiole,fions,firme,fiscs,fisse,fites,fixai,fixas,fixat,fixee,fixer,fixes,fixez,fjeld,fjord,flair,flana,flanc,flane,flans,flapi,flash,fleau,flein,fleur,flics,flint,flirt,flood,flops,flore,flots,floua,floue,flous,fluai,fluas,fluat,fluer,flues,fluet,fluez,fluor,flush,fluta,flute,fluxa,fluxe,focal,foehn,foies,foins,foira,foire,folie,folio,folks,folle,fonca,fonce,fonda,fonde,fonds,fondu,fonte,foots,forai,foras,forat,forca,force,forci,foree,forer,fores,foret,forez,forge,forma,forme,forte,forts,forum,fosse,fouee,fouet,fouge,fouie,fouir,fouis,fouit,foula,foule,fours,foute,foutu,fovea,foxee,foxes,foyer,fracs,fraie,frais,franc,frape,fraya,fraye,frein,frele,fremi,frene,freon,frere,freta,frete,frets,freux,frics,frigo,frima,frime,fripa,fripe,frira,frire,frisa,frise,frite,fritz,frocs,froid,frola,frole,front,froua,froue,fruit,fucus,fuels,fugua,fugue,fuies,fuira,fuite,fulls,fumai,fumas,fumat,fumee,fumer,fumes,fumet,fumez,funin,funky,furax,furet,furia,furie,fusai,fusas,fusat,fusee,fusel,fuser,fuses,fusez,fusil,fusse,futee,futes,futur,fuyez,gable,gacha,gache,gades,gadin,gaffa,gaffe,gagas,gagea,gagee,gager,gages,gagez,gagna,gagne,gaiac,gaies,gaina,gaine,gains,galas,galba,galbe,gales,galet,gallo,galon,galop,gamba,gambe,gamin,gamme,ganga,gangs,gansa,ganse,ganta,gante,gants,garai,garas,garat,garce,garda,garde,garee,garer,gares,garez,garni,garou,gatai,gatas,gatat,gatee,gater,gates,gatez,gatte,gaude,gaula,gaule,gaupe,gaurs,gauss,gavai,gavas,gavat,gavee,gaver,gaves,gavez,gayal,gazai,gazas,gazat,gazee,gazer,gazes,gazez,gazon,geais,geant,gecko,geins,geint,gelai,gelas,gelat,gelee,geler,geles,gelez,gelif,gemie,gemir,gemis,gemit,gemma,gemme,genai,genas,genat,genee,gener,genes,genet,genez,genie,genou,genre,geode,geole,gerai,geras,gerat,gerba,gerbe,gerca,gerce,geree,gerer,geres,gerez,germa,germe,gesir,gesse,geste,gibet,gibus,gicla,gicle,gifla,gifle,gigot,gigue,gilde,gilet,gille,girie,girls,giron,gisez,gitai,gitan,gitas,gitat,giter,gites,gitez,giton,givra,givre,glaca,glace,glana,gland,glane,glapi,glass,glati,glebe,glene,globe,glome,glosa,glose,gluau,gluis,glume,gnole,gnome,gnons,gnose,gnous,goals,gobai,gobas,gobat,gobee,gober,gobes,gobez,gobie,godai,godas,godat,goder,godes,godet,godez,goglu,gogos,golfe,golfs,gombo,gomma,gomme,gonda,gonde,gonds,gongs,gonze,gords,goret,gorge,gosse,goton,gouda,gouet,gouge,goule,goulu,goums,goura,gourd,goure,gouta,goute,gouts,goyim,grace,grade,grain,grand,graux,grava,grave,gravi,greai,greas,great,grebe,grecs,greee,green,greer,grees,greez,grege,grela,grele,grena,grene,grenu,gresa,grese,greva,greve,grief,grill,grils,grima,grime,griot,grisa,grise,grive,grogs,groin,grole,groom,group,gruau,grues,gruge,grume,guais,guano,gueai,gueas,gueat,guede,gueee,gueer,guees,gueez,guepe,guere,gueri,guete,guets,gueux,guida,guide,guipa,guipe,guise,guppy,gurus,guzla,gypse,gyrin,habit,habla,hable,hacha,hache,hadji,haies,haiks,haiku,haine,haira,haire,halai,halas,halat,halbi,halee,haler,hales,halez,halle,halls,halos,halte,halva,hamac,hampe,hanap,hanse,hanta,hante,hapax,happa,happe,haras,harda,harde,hardi,harem,harki,harle,haros,harpa,harpe,harts,hasch,hases,haste,hasts,hatai,hatas,hatat,hatee,hater,hates,hatez,hatif,haute,hauts,havai,havas,havat,havee,haver,haves,havez,havie,havir,havis,havit,havre,hayon,hecto,helai,helas,helat,helee,heler,heles,helez,helix,hello,henne,henni,henry,herba,herbe,herbu,heres,heron,heros,herpe,hersa,herse,hertz,hetre,heure,heurs,heurt,hevea,hibou,hindi,hippy,hissa,hisse,hiver,hobby,hocco,hocha,hoche,hoirs,homes,homme,homos,honni,honte,horde,horst,hosto,hotel,hotes,hotte,houai,houas,houat,houee,houer,houes,houez,houka,houle,hourd,houri,hoyau,huais,huait,huant,huard,huart,hucha,huche,huees,huent,huera,huiez,huila,huile,humai,humas,humat,humee,humer,humes,humez,humus,hunes,huons,huppe,hures,hurla,hurle,huron,hutte,hydne,hydre,hyene,hymen,hymne,iambe,ibere,ichor,icone,ictus,ideal,ideel,idees,idiot,idole,igloo,ignee,ignes,igues,ileal,ileon,ileus,ilien,ilion,ilote,ilots,image,imago,imams,imbue,imbus,imide,imita,imite,immun,imper,impie,impot,impur,incas,index,indue,indus,infra,infus,inlay,innee,innes,inoui,input,inter,intis,inuit,inule,iodai,iodas,iodat,iodee,ioder,iodes,iodez,iodla,iodle,ioula,ioule,ipeca,irais,irait,iriez,irisa,irise,irone,irons,iront,isard,isbas,islam,isola,isole,issue,issus,items,itera,itere,iules,ivres,ixias,ixode,jabla,jable,jabot,jacee,jacks,jacot,jacta,jacte,jades,jadis,jaina,jains,jalap,jales,jalon,jambe,jante,japon,jappa,jappe,jarde,jarre,jasai,jasas,jasat,jaser,jases,jasez,jaspa,jaspe,jatte,jauge,jaune,jauni,javas,javel,jeans,jeeps,jenny,jerez,jerka,jerke,jerks,jesus,jetai,jetas,jetat,jetee,jeter,jetes,jetez,jeton,jette,jeudi,jeuna,jeune,jodla,jodle,joies,joins,joint,joker,jolie,jolis,jonca,jonce,joncs,jotas,jouai,joual,jouas,jouat,jouee,jouer,joues,jouet,jouez,jougs,jouir,jouis,jouit,joule,jours,jouta,joute,joyau,jubes,jucha,juche,judas,judos,jugal,jugea,jugee,juger,juges,jugez,juifs,juill,juive,julep,jules,jumbo,jumel,junte,jupes,jupon,jurai,juras,jurat,juree,jurer,jures,jurez,juron,jurys,jusee,jusqu,juste,jutai,jutas,jutat,jutee,juter,jutes,jutez,kacha,kache,kakis,kalis,kamis,kapok,kappa,karma,karts,kavas,kawas,kayac,kayak,kefir,kendo,kepis,ketch,khans,khats,khmer,khols,kicks,kiefs,kikis,kilos,kilts,kiwis,knout,koala,koine,kolas,kores,kraal,krach,kraft,kraks,kriss,ksour,kurde,kyrie,kyste,label,labie,labre,lacai,lacas,lacat,lacee,lacer,laces,lacet,lacez,lacha,lache,lacis,lacte,ladin,ladre,lagon,laics,laide,laids,laies,laina,laine,laird,laite,laits,laius,laize,lamai,lamas,lamat,lamee,lamer,lames,lamez,lamie,lampa,lampe,lanca,lance,lande,lange,lapai,lapas,lapat,lapee,laper,lapes,lapez,lapin,lapis,laqua,laque,larda,larde,lards,large,largo,larme,larve,laser,lassa,lasse,lasso,latex,latin,latta,latte,laure,lavai,lavas,lavat,lavee,laver,laves,lavez,lavis,layai,layas,layat,layee,layer,layes,layez,layon,lazzi,lebel,lecha,leche,lecon,ledit,legal,legat,leger,leges,legua,legue,lemme,lente,lento,lents,lepre,lerot,lesai,lesas,lesat,lesee,leser,leses,lesez,lesta,leste,lests,letal,leude,leurs,levai,levas,levat,levee,lever,leves,levez,levre,lexie,lexis,liage,liais,liait,liane,liant,liard,liber,libre,lices,licha,liche,licol,licou,lidos,lieds,liees,liege,liens,lient,liera,lieue,lieur,lieus,lieux,lifta,lifte,lifts,liges,ligie,ligna,ligne,ligot,ligua,ligue,liiez,lilas,limai,liman,limas,limat,limbe,limee,limer,limes,limez,limon,liner,linga,linge,links,linon,linos,lions,lippe,lippu,lirai,liras,lirez,liron,lises,lisez,lissa,lisse,lista,liste,litai,litas,litat,litee,liter,lites,litez,litho,litre,liure,lives,livet,livra,livre,lobai,lobas,lobat,lobby,lobee,lober,lobes,lobez,local,locha,loche,lochs,loden,loess,lofai,lofas,lofat,lofer,lofes,lofez,lofts,logea,logee,loger,loges,logez,logis,logos,loirs,lolos,longe,longs,looch,loofa,looks,lopin,loqua,loque,loran,lords,loris,lotes,lotie,lotir,lotis,lotit,lotos,lotte,lotus,louai,louas,louat,louee,louer,loues,louez,loufa,loufe,louis,loupa,loupe,loups,loura,lourd,loure,louva,louve,lovai,lovas,lovat,lovee,lover,loves,lovez,loyal,loyer,lubie,lucre,lueur,luffa,lugea,luger,luges,lugez,luira,luire,luise,luite,luits,lulus,lumen,lumes,lumps,lunch,lundi,lunee,lunes,lupin,lupus,luron,lusin,lusse,lutai,lutas,lutat,lutee,luter,lutes,lutez,luths,lutin,lutta,lutte,luxai,luxas,luxat,luxee,luxer,luxes,luxez,lycee,lycra,lyres,lyric,lysai,lysas,lysat,lysee,lyser,lyses,lysez,macha,mache,macho,macis,macla,macle,macon,macre,madre,mafia,mages,magie,magma,magna,magne,magot,maias,maies,mails,mains,maint,maire,major,makis,males,malin,malis,malle,malta,malte,malts,malus,maman,mambo,mamie,mammy,manas,manda,mande,manes,mange,mania,manie,manne,manse,mante,maori,maoux,maqua,maque,marcs,mardi,maree,mares,marge,maria,marie,marin,maris,marks,marli,marna,marne,marra,marre,marri,marte,maser,massa,masse,mataf,matai,matas,matat,match,matee,mater,mates,matez,maths,matie,matin,matir,matis,matit,maton,matou,matte,maure,mauve,mayas,mayen,mayes,meats,mecha,meche,medes,media,medis,medit,medoc,mefia,mefie,mefis,mefit,megie,megir,megis,megit,megot,meiji,melai,melas,melat,melba,melee,meler,meles,melez,melia,melon,melos,memes,menai,menas,menat,menee,mener,menes,menez,menin,mense,mente,menti,menue,menus,merci,merde,meres,merle,merlu,merou,mesas,messe,metal,metas,meteo,metis,metra,metre,metro,mette,meula,meule,meure,meurs,meurt,meute,meuve,mezzo,miaou,micas,miche,micro,midis,miels,miens,mieux,migra,migre,milan,miles,mille,mimai,mimas,mimat,mimee,mimer,mimes,mimez,mimis,minai,minas,minat,mince,minci,minee,miner,mines,minet,minez,minis,minot,minou,minus,mirai,miras,mirat,miree,mirer,mires,mirez,miros,misai,misas,misat,misee,miser,mises,misez,misse,mitai,mitan,mitas,mitat,mitee,miter,mites,mitez,miton,mitre,mixai,mixas,mixat,mixee,mixer,mixes,mixez,mixte,moche,mocos,modal,modem,modes,modus,moere,moine,moins,moira,moire,moisa,moise,moisi,moita,moite,moiti,mokas,moles,molle,molli,mollo,molys,momes,momie,monda,monde,monel,monos,monta,monte,monts,moqua,moque,moral,morde,mords,mordu,mores,morio,morne,morse,morte,morts,morue,morve,mosan,motel,motet,motif,motos,motta,motte,motus,mouds,moues,moula,moule,moult,moulu,mouts,mouva,mouve,moxas,moyee,moyen,moyes,moyeu,muais,muait,muant,mucha,muche,mucor,mucus,muees,muent,muera,muets,mufle,mufti,muges,mugir,mugis,mugit,muids,muiez,mules,mulet,mulon,mulot,mumes,munie,munir,munis,munit,muons,murai,mural,muras,murat,muree,murer,mures,muret,murex,murez,murie,murir,muris,murit,musai,musas,musat,muscs,musee,muser,muses,musez,mussa,musse,musts,mutai,mutas,mutat,mutee,muter,mutes,mutez,mutin,myome,myope,myrte,mythe,nabab,nabot,nacra,nacre,nadir,nafes,nagea,nagee,nager,nages,nagez,naifs,naine,nains,naive,najas,nanan,nanar,nanas,nanti,napee,napel,nappa,nappe,nards,narra,narre,nasal,nases,nasse,natal,natif,natta,natte,naval,navet,navra,navre,nazie,nazis,neant,nebka,necks,nefle,negre,negus,neige,nenes,nenni,neons,nerfs,nervi,nette,neufs,neume,neuve,neves,neveu,niais,niait,niant,nicha,niche,nicol,niece,niees,nieme,nient,niera,nifes,niiez,nille,nimba,nimbe,ninas,niole,nions,nippa,nippe,nique,nitra,nitre,nival,nixes,noble,noces,nocif,noels,noeud,noies,noire,noirs,noise,nolis,nomes,nomma,nomme,nonce,nones,nonne,nopai,nopal,nopas,nopat,nopee,noper,nopes,nopez,nordi,noria,norme,notai,notas,notat,notee,noter,notes,notez,notre,nouai,nouas,nouat,nouba,nouee,nouer,noues,nouez,novai,novas,novat,novee,nover,noves,novez,noyai,noyas,noyat,noyau,noyee,noyer,noyes,noyez,nuage,nuais,nuait,nuant,nuees,nuent,nuera,nuiez,nuira,nuire,nuise,nuite,nuits,nulle,nuons,nuque,nurse,nylon,oasis,obeir,obeis,obeit,obele,obels,obera,obere,obese,obier,obits,objet,oblat,obole,obtus,obvia,obvie,occlu,ocean,ocrai,ocras,ocrat,ocree,ocrer,ocres,ocrez,octet,odeon,odeur,oeufs,oeuve,offre,oflag,ogive,ogres,oille,oings,ointe,oints,oisif,oison,okapi,oleum,olive,omble,ombra,ombre,omega,omets,omise,onces,oncle,ondee,ondes,ondin,ongle,opale,opens,opera,opere,opiat,opina,opine,opium,optai,optas,optat,opter,optes,optez,orage,orale,orant,oraux,orbes,ordre,orees,orges,orgie,orgue,oriel,orins,orles,orlon,ormes,ornai,ornas,ornat,ornee,orner,ornes,ornez,orobe,orpin,orque,ortie,orvet,osais,osait,osant,oscar,osees,osent,osera,oside,osier,osiez,osons,osque,ossue,ossus,otage,otais,otait,otant,otees,otent,otera,otiez,otite,otons,ouais,ouata,ouate,oubli,ouche,oueds,ouest,ouies,ouira,ourdi,ourla,ourle,ourse,ouste,outil,outra,outre,ouvra,ouvre,ovale,ovate,ovine,ovins,ovnis,ovula,ovule,oxyda,oxyde,oyais,oyats,ozene,ozone,pacha,packs,pacte,paddy,padou,pagea,pagee,pagel,pager,pages,pagez,pagne,pagre,pagus,paien,paies,pains,paire,pairs,palan,palee,pales,palet,palie,palir,palis,palit,palma,palme,palot,palpa,palpe,palud,palus,pamai,pamas,pamat,pamee,pamer,pames,pamez,pampa,panai,panas,panat,panax,panca,panda,panee,panel,paner,panes,panez,panic,panka,panna,panne,pansa,panse,pansu,paons,papal,papas,papes,papis,papys,paque,parai,paras,parat,parce,parcs,pardi,paree,pareo,parer,pares,parez,paria,parie,paris,parka,parla,parle,parme,parmi,paroi,paros,parsi,parte,parti,parts,parue,parus,parut,passa,passe,patai,patas,patat,patee,pater,pates,patez,patio,patir,patis,patit,paton,patre,patta,patte,pattu,pauma,paume,pausa,pause,pavai,pavas,pavat,pavee,paver,paves,pavez,pavie,pavot,payai,payas,payat,payee,payer,payes,payez,payse,peage,peans,peaux,pecha,peche,pedum,pegre,peina,peine,peins,peint,pekan,pekin,pelai,pelas,pelat,pelee,peler,peles,pelez,pelle,pelta,pelte,penal,pende,pends,pendu,penes,penil,penis,penne,penny,penon,pensa,pense,pente,pentu,peons,pepes,pepia,pepie,pepin,pepon,perca,perce,percu,perde,perds,perdu,peres,peril,perir,peris,perit,perla,perle,perot,perse,perte,pesai,pesas,pesat,pesee,peser,peses,pesez,peson,pesos,pesse,pesta,peste,petai,petas,petat,petee,peter,petes,petez,petit,peton,petre,petri,petun,peuls,peurs,pezes,phage,phare,phase,philo,phlox,phone,phono,photo,piafs,piano,pians,picas,picot,piece,pieds,piege,pieta,piete,pieux,pieze,pifai,pifas,pifat,pifee,pifer,pifes,pifez,piffa,piffe,pigea,pigee,piger,piges,pigez,pigne,pilaf,pilai,pilas,pilat,pilee,piler,piles,pilet,pilez,pilla,pille,pilon,pilou,pilum,pinca,pince,pinne,pinot,pinta,pinte,pions,pipai,pipas,pipat,pipee,piper,pipes,pipez,pipis,pipit,piqua,pique,pires,pises,pissa,pisse,pista,piste,pites,pitie,piton,pitre,pives,pivot,pizza,placa,place,plage,plaid,plaie,plais,plait,plana,plane,plans,plant,plate,plats,plebe,plein,pleur,pleut,pliai,plias,pliat,pliee,plier,plies,pliez,ploie,plomb,plots,plouc,plouf,plouk,ploya,ploye,pluie,pluma,plume,pneus,pocha,poche,poela,poele,poeme,poete,pogne,poids,poila,poile,poils,poilu,poing,poins,point,poire,poise,poker,polar,poles,polie,polio,polir,polis,polit,polka,polos,pomma,pomme,pompa,pompe,ponca,ponce,ponde,ponds,pondu,poney,ponge,ponta,ponte,ponts,pools,popes,poqua,poque,porcs,pores,porno,porta,porte,porto,ports,posai,posas,posat,posee,poser,poses,posez,posta,poste,potee,potes,potin,pouah,pouce,poufs,poule,pouls,poupe,prame,preau,prele,prend,preta,prete,prets,preux,prevu,priai,prias,priat,priee,prier,pries,priez,prima,prime,primo,prisa,prise,priva,prive,probe,profs,proie,prolo,promo,promu,prona,prone,prose,prote,proue,provo,prude,prune,psitt,psoas,ptose,puais,puait,puant,pubis,puces,puche,puees,puent,puera,puiez,puine,puisa,puise,puits,pulls,pulpe,pulsa,pulse,pumas,pumes,punas,punch,punie,punir,punis,punit,punks,puons,pupes,puree,pures,purge,purin,purot,pusse,putes,putti,putto,pyrex,quais,quand,quant,quark,quart,quasi,quels,queta,quete,queue,queux,quiet,quine,quint,quipo,quipu,quota,raban,rabat,rabbi,rabla,rable,rabot,racee,racer,races,racla,racle,radai,radar,radas,radat,radee,rader,rades,radez,radia,radie,radin,radio,radis,rafla,rafle,ragea,rager,rages,ragez,ragot,ragua,rague,raias,raide,raidi,raids,raies,rails,raina,raine,rajah,rajas,rakis,ralai,ralas,ralat,raler,rales,ralez,ramai,ramas,ramat,ramee,ramer,rames,ramez,ramie,ramis,rampa,rampe,rance,ranch,ranci,range,rangs,ranis,raout,rapai,rapas,rapat,rapee,raper,rapes,rapez,rapin,rapts,raqua,raque,rares,rasai,rasas,rasat,rasee,raser,rases,rasez,rashs,rasta,ratai,ratas,ratat,ratee,ratel,rater,rates,ratez,ratio,raton,raves,ravie,ravin,ravir,ravis,ravit,rayai,rayas,rayat,rayee,rayer,rayes,rayez,rayon,reacs,reagi,reais,reait,reale,reant,reaux,rebab,rebat,rebec,rebus,rebut,recel,reces,recez,reche,recif,recit,recru,recta,recto,recue,recul,recus,recut,redan,redie,redis,redit,redue,redus,redut,reels,reelu,reent,reera,refis,refit,refus,regal,regie,regir,regis,regit,regla,regle,reglo,regna,regne,reiez,reine,reins,rejet,relax,relia,relie,relis,relit,relue,relus,relut,remet,remis,remit,remiz,remua,remue,renal,rende,rends,rendu,renee,renes,renia,renie,renne,renom,renta,rente,reons,repas,repic,repit,repli,replu,repos,repue,repus,reput,resta,reste,retif,retro,reuni,revai,revas,revat,revee,rever,reves,revet,revez,revis,revit,revue,revus,rhuma,rhumb,rhume,rhums,riais,riait,rials,riant,ribla,rible,riche,ricin,ridai,ridas,ridat,ridee,rider,rides,ridez,riels,riens,rient,rieur,rifla,rifle,rifts,riiez,rimai,rimas,rimat,rimee,rimer,rimes,rimez,rinca,rince,rings,rions,ripai,ripas,ripat,ripee,riper,ripes,ripez,rirai,riras,rires,rirez,risee,risse,rital,rites,rivai,rival,rivas,rivat,rivee,river,rives,rivet,rivez,rixes,robai,robas,robat,robee,rober,robes,robez,robin,robot,roche,rocks,rocou,rodai,rodas,rodat,rodee,rodeo,roder,rodes,rodez,rogna,rogne,rogue,roide,roidi,roles,roman,rompe,romps,rompt,rompu,ronce,ronde,rondi,rondo,ronds,roneo,ronge,roqua,roque,rosai,rosas,rosat,rosee,roser,roses,rosez,rosie,rosir,rosis,rosit,rossa,rosse,rotai,rotas,rotat,roter,rotes,rotez,rotie,rotin,rotir,rotis,rotit,rotor,rouai,rouan,rouas,rouat,rouee,rouer,roues,rouet,rouez,roufs,rouge,rougi,rouie,rouir,rouis,rouit,roula,roule,roumi,round,routa,route,royal,ruade,ruais,ruait,ruant,ruban,rubis,rucha,ruche,rudes,ruees,ruent,ruera,rugby,rugir,rugis,rugit,ruiez,ruila,ruile,ruina,ruine,rumba,rumen,rumex,ruolz,ruons,rupin,rural,rusai,rusas,rusat,rusee,ruser,ruses,rusez,rushs,russe,sabir,sabla,sable,sabot,sabra,sabre,sache,sacra,sacre,safre,sagas,sages,sagou,sagum,sahel,saiga,saine,sains,saint,saisi,saite,sajou,sakes,sakis,salai,salas,salat,salee,salep,saler,sales,salez,salie,salin,salir,salis,salit,salle,salol,salon,salop,salsa,salse,salua,salue,salut,salve,samba,samit,sampi,sanas,sangs,sanie,sante,sanve,sanza,saoul,sapai,sapas,sapat,sapee,saper,sapes,sapez,sapin,saqua,saque,sarde,saris,saros,sassa,sasse,satin,satis,sauca,sauce,sauge,saule,sauna,saune,saura,saure,sauri,saurs,sauta,saute,sauts,sauva,sauve,savez,savon,saxes,saxon,saxos,sayon,sbire,scalp,scare,scats,sceau,scene,schah,sciai,scias,sciat,sciee,scier,scies,sciez,scion,scoop,score,scout,scull,scuta,seant,seaux,sebka,sebum,secha,seche,secte,seide,seime,seine,seing,seins,seize,selfs,sella,selle,selon,seltz,selve,semai,semas,semat,semee,semer,semes,semez,semis,senat,senau,senes,senne,sense,sente,senti,seoir,sepia,serac,serai,seras,serbe,serez,serfs,serge,seria,serie,serin,serpe,serra,serre,serte,serti,serum,serve,servi,seton,seuil,seule,seuls,seves,sevir,sevis,sevit,sevra,sevre,sexes,sexte,sexto,sexue,shahs,shako,shoot,short,shows,shunt,sicle,siege,siens,siera,sieur,sigle,sigma,signa,signe,silex,silos,simas,singe,sinon,sinus,sioux,sires,sirex,sirli,sirop,sisal,sises,sitar,sites,sitot,situa,situe,siums,sixte,skais,skate,skiai,skias,skiat,skier,skies,skiez,skiff,skifs,slang,slave,slips,sloop,slows,smala,smalt,smart,smash,smogs,smolt,smurf,snack,sniff,snoba,snobe,snobs,sobre,socle,sodas,sodee,sodes,soeur,sofas,soies,soifs,soins,soirs,sojas,solda,solde,solen,soles,solex,solin,solos,somas,somma,somme,sonar,sonda,sonde,songe,sonna,sonne,sonos,sorbe,sores,sorte,sorti,sorts,sosie,sotch,sotie,sotte,souci,souda,soude,soues,souks,soula,soule,souls,soupa,soupe,sourd,souri,soute,soyas,soyer,soyez,spahi,spart,spath,speos,sphex,spire,spore,sport,spots,sprat,spray,sprue,squat,squaw,stade,staff,stage,stand,stars,stase,steak,stele,stemm,stems,steno,stera,stere,stick,stipe,stock,stops,store,stout,stras,stria,strie,strix,stucs,styla,style,stylo,suage,suais,suait,suant,suave,suber,subie,subir,subis,subit,sucai,sucas,sucat,sucee,sucer,suces,sucez,sucon,sucra,sucre,suede,suees,suent,suera,sueur,suies,suiez,suifa,suife,suifs,suint,suite,suive,suivi,sujet,sulky,sumac,sumes,sunna,suons,super,supin,supra,surah,sures,suret,surfa,surfe,surfs,surgi,surin,surir,suris,surit,suros,sushi,susse,sutes,sutra,swaps,swing,sylve,sympa,tabac,tabar,tabes,tabla,table,tabor,tabou,tacca,tacet,tacha,tache,tacon,tacot,tacts,tafia,tagal,taies,taiga,tains,taira,taire,taise,talai,talas,talat,talcs,talee,taler,tales,talez,talla,talle,talon,talus,tamia,tamil,tamis,tanca,tance,tango,tanin,tanks,tanna,tanne,tante,taons,tapai,tapas,tapat,tapee,taper,tapes,tapez,tapie,tapin,tapir,tapis,tapit,tapon,taqua,taque,tarai,taras,tarat,tarda,tarde,taree,tarer,tares,taret,tarez,targe,tarie,tarif,tarin,tarir,taris,tarit,tarot,tarse,tarte,tarti,tassa,tasse,tatai,tatas,tatat,tatee,tater,tates,tatez,tatou,taule,taupe,taure,taxai,taxas,taxat,taxee,taxer,taxes,taxez,taxie,taxis,taxon,tchao,tecks,teins,teint,teles,telex,telle,tells,tempe,tempo,temps,tende,tends,tendu,tenez,tenia,tenir,tenon,tenor,tenta,tente,tenue,tenus,terca,terce,terme,terne,terni,terra,terre,terri,tersa,terse,testa,teste,tests,tetai,tetas,tetat,tetee,teter,tetes,tetez,tetin,teton,tetra,tette,tetue,tetus,texan,texte,thaie,theme,these,theta,thons,thora,thune,thuya,thyms,tians,tiare,tibia,tiede,tiedi,tiens,tient,tiers,tiffe,tiges,tigra,tigre,tilde,tilla,tille,tilts,timon,tinta,tinte,tiqua,tique,tirai,tiras,tirat,tiree,tirer,tires,tiret,tirez,tisai,tisas,tisat,tisee,tiser,tises,tisez,tison,tissa,tisse,tissu,titan,titis,titra,titre,tmese,toast,toges,toila,toile,toisa,toise,toits,tokai,tokay,tolee,toles,tolet,tolle,tolus,tomai,tomas,tomat,tomba,tombe,tomee,tomer,tomes,tomez,tomme,tommy,tonal,tonde,tonds,tondu,tonie,tonka,tonna,tonne,tonte,tonus,topai,topas,topat,toper,topes,topez,topos,toqua,toque,torah,torde,tords,tordu,torea,toree,torii,toril,toron,torse,torts,torve,total,totem,toton,totos,touai,touas,touat,touee,touer,toues,touez,tourd,tours,toute,touts,trabe,traca,trace,tracs,tract,trahi,traie,train,trais,trait,trama,trame,trams,trapu,trema,treve,triai,trial,trias,triat,tribu,tridi,triee,trier,tries,triez,trima,trime,trine,trins,triol,trios,tripe,trips,trocs,trois,troll,trona,tronc,trone,trope,trots,troua,troue,trous,trucs,truie,trust,tsars,tuage,tuais,tuait,tuant,tubai,tubas,tubat,tubee,tuber,tubes,tubez,tuees,tuent,tuera,tueur,tuiez,tuila,tuile,tulle,tumes,tuner,tunes,tuons,tuque,turbe,turco,turcs,turfs,turne,tusse,tutes,tutie,tutti,tutus,tuyau,tweed,twist,typai,typas,typat,typee,typer,types,typez,typha,typon,typos,tyran,tzars,ubacs,ukase,ulema,ultra,ulula,ulule,ulves,unaus,unies,union,unira,unite,urane,urate,urees,urgea,urger,urina,urine,urnes,urubu,usage,usais,usait,usant,usees,usent,usera,usiez,usina,usine,usite,usnee,usons,usuel,usure,utile,uvale,uvaux,uvees,uvula,uvule,vache,vagin,vagir,vagis,vagit,vagua,vague,vainc,vaine,vains,vaire,vairs,valet,valez,valsa,valse,value,valus,valut,valve,vampa,vampe,vamps,vanda,vanna,vanne,vanta,vante,vapes,vaqua,vaque,varan,varia,varie,varus,varve,vases,vaste,veaux,veces,vecue,vecus,vecut,vedas,veina,veine,velai,velar,velas,velat,velds,veler,veles,velez,velie,velin,velos,velot,velte,velue,velum,velus,venal,vende,vends,vendu,venet,venez,venge,venin,venir,venta,vente,vents,venue,venus,verbe,verdi,verge,verin,verni,verra,verre,versa,verse,verso,verte,verts,vertu,verve,vesce,vespa,vessa,vesse,veste,vetes,vetez,vetir,vetis,vetit,vetue,vetus,veufs,veule,veuve,vexai,vexas,vexat,vexee,vexer,vexes,vexez,vibra,vibre,vices,vichy,vicia,vicie,vidai,vidas,vidat,videe,video,vider,vides,videz,vieil,viens,vient,vieux,vigie,vigne,viles,villa,ville,vimes,vinai,vinas,vinat,vinee,viner,vines,vinez,vingt,viocs,viola,viole,viols,virai,viral,viras,virat,viree,virer,vires,virez,viril,virus,visai,visas,visat,visee,viser,vises,visez,vison,vissa,visse,vitae,vital,vites,vitra,vitre,vivat,vives,vivez,vivra,vivre,vizir,vocal,vodka,voeux,vogua,vogue,voici,voies,voila,voile,voire,volai,volas,volat,volee,voler,voles,volet,volez,volis,volta,volte,volts,volve,vomer,vomie,vomir,vomis,vomit,votai,votas,votat,votee,voter,votes,votez,votif,votre,vouai,vouas,vouat,vouee,vouer,voues,vouez,vouge,voulu,vouta,voute,voyer,voyez,voyou,vraie,vrais,vulgo,vulve,wagon,watts,weber,wharf,whigs,whist,winch,xenon,xeres,xerus,xipho,xyste,yacht,yacks,yards,yeble,yeuse,yogas,yogis,yoles,yucca,zabre,zains,zanis,zanni,zanzi,zazou,zebra,zebre,zebus,zelee,zeles,zends,zeros,zesta,zeste,zibai,zibas,zibat,zibee,ziber,zibes,zibez,zigua,zigue,zincs,zippa,zippe,zizis,zloty,zoile,zombi,zonai,zonal,zonas,zonat,zonee,zoner,zones,zonez,zooms,zozos');
var $author$project$Main$getWords = function (lang) {
	if (!lang) {
		return $author$project$Words$english;
	} else {
		return $author$project$Words$french;
	}
};
var $author$project$Main$initialModel = function (lang) {
	return {
		h: lang,
		s: $author$project$Main$Idle,
		R: $author$project$Main$getWords(lang)
	};
};
var $author$project$Main$English = 0;
var $author$project$Main$French = 1;
var $author$project$Main$parseLang = function (string) {
	return A2($elm$core$String$startsWith, 'fr', string) ? 1 : 0;
};
var $elm$random$Random$andThen = F2(
	function (callback, _v0) {
		var genA = _v0;
		return function (seed) {
			var _v1 = genA(seed);
			var result = _v1.a;
			var newSeed = _v1.b;
			var _v2 = callback(result);
			var genB = _v2;
			return genB(newSeed);
		};
	});
var $elm$random$Random$constant = function (value) {
	return function (seed) {
		return _Utils_Tuple2(value, seed);
	};
};
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return function (seed0) {
			var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			var lo = _v0.a;
			var hi = _v0.b;
			var range = (hi - lo) + 1;
			if (!((range - 1) & range)) {
				return _Utils_Tuple2(
					(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
					$elm$random$Random$next(seed0));
			} else {
				var threshhold = (((-range) >>> 0) % range) >>> 0;
				var accountForBias = function (seed) {
					accountForBias:
					while (true) {
						var x = $elm$random$Random$peel(seed);
						var seedN = $elm$random$Random$next(seed);
						if (_Utils_cmp(x, threshhold) < 0) {
							var $temp$seed = seedN;
							seed = $temp$seed;
							continue accountForBias;
						} else {
							return _Utils_Tuple2((x % range) + lo, seedN);
						}
					}
				};
				return accountForBias(seed0);
			}
		};
	});
var $author$project$Main$randomWord = function (words) {
	return A2(
		$elm$random$Random$andThen,
		function (_int) {
			return $elm$random$Random$constant(
				$elm$core$List$head(
					A2(
						$elm$core$List$filterMap,
						$elm$core$Basics$identity,
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (index, word) {
									return _Utils_eq(index, _int) ? $elm$core$Maybe$Just(word) : $elm$core$Maybe$Nothing;
								}),
							words))));
		},
		A2(
			$elm$random$Random$int,
			0,
			$elm$core$List$length(words) - 1));
};
var $author$project$Main$init = function (flags) {
	var model = $author$project$Main$initialModel(
		$author$project$Main$parseLang(flags.h));
	return _Utils_Tuple2(
		model,
		A2(
			$elm$random$Random$generate,
			$author$project$Main$NewWord,
			$author$project$Main$randomWord(model.R)));
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$Errored = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$NewGame = {$: 0};
var $author$project$Main$Ongoing = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $author$project$Main$Lost = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$Main$Won = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$Main$hasWon = function (attempts) {
	if (!attempts.b) {
		return false;
	} else {
		var last = attempts.a;
		return A2(
			$elm$core$List$all,
			function (letter) {
				if (letter.$ === 1) {
					return true;
				} else {
					return false;
				}
			},
			last);
	}
};
var $author$project$Main$maxAttempts = 6;
var $author$project$Main$checkGame = F2(
	function (word, attempts) {
		return $author$project$Main$hasWon(attempts) ? A2($author$project$Main$Won, word, attempts) : ((_Utils_cmp(
			$elm$core$List$length(attempts),
			$author$project$Main$maxAttempts) > -1) ? A2($author$project$Main$Lost, word, attempts) : A4($author$project$Main$Ongoing, word, attempts, '', $elm$core$Maybe$Nothing));
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Main$Handled = function (a) {
	return {$: 3, a: a};
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Main$isCorrectChar = F2(
	function (_char, letter) {
		if (letter.$ === 1) {
			var c = letter.a;
			return _Utils_eq(c, _char);
		} else {
			return false;
		}
	});
var $author$project$Main$handleCorrectDuplicates = F2(
	function (wordChars, attempt) {
		return A2(
			$elm$core$List$map,
			function (letter) {
				if (letter.$ === 2) {
					var c = letter.a;
					var _v1 = _Utils_Tuple2(
						$elm$core$List$length(
							A2(
								$elm$core$List$filter,
								$elm$core$Basics$eq(c),
								wordChars)),
						$elm$core$List$length(
							A2(
								$elm$core$List$filter,
								$author$project$Main$isCorrectChar(c),
								attempt)));
					var nbCharsInWord = _v1.a;
					var nbCorrectInAttempt = _v1.b;
					return (_Utils_cmp(nbCorrectInAttempt, nbCharsInWord) > 0) ? $author$project$Main$Handled(c) : letter;
				} else {
					return letter;
				}
			},
			attempt);
	});
var $author$project$Main$isMisplacedChar = F2(
	function (_char, letter) {
		if (letter.$ === 2) {
			var c = letter.a;
			return _Utils_eq(c, _char);
		} else {
			return false;
		}
	});
var $author$project$Main$handleMisplacedDuplicates = function (wordChars) {
	return A2(
		$elm$core$List$foldl,
		F2(
			function (letter, acc) {
				if (letter.$ === 2) {
					var c = letter.a;
					var _v1 = _Utils_Tuple2(
						$elm$core$List$length(
							A2(
								$elm$core$List$filter,
								$elm$core$Basics$eq(c),
								wordChars)),
						$elm$core$List$length(
							A2(
								$elm$core$List$filter,
								$author$project$Main$isMisplacedChar(c),
								acc)));
					var nbCharInWord = _v1.a;
					var nbCharInAcc = _v1.b;
					return (_Utils_cmp(nbCharInAcc, nbCharInWord) > -1) ? _Utils_ap(
						acc,
						_List_fromArray(
							[
								$author$project$Main$Handled(c)
							])) : _Utils_ap(
						acc,
						_List_fromArray(
							[letter]));
				} else {
					return _Utils_ap(
						acc,
						_List_fromArray(
							[letter]));
				}
			}),
		_List_Nil);
};
var $author$project$Main$langToString = function (lang) {
	if (!lang) {
		return 'English';
	} else {
		return 'French';
	}
};
var $author$project$Main$Correct = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$Misplaced = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$Unused = function (a) {
	return {$: 0, a: a};
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Main$mapChars = F3(
	function (wordChars, inputChar, wordChar) {
		return _Utils_eq(inputChar, wordChar) ? $author$project$Main$Correct(inputChar) : (A2($elm$core$List$member, inputChar, wordChars) ? $author$project$Main$Misplaced(inputChar) : $author$project$Main$Unused(inputChar));
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {a6: index, a8: match, bk: number, br: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{aV: false, ba: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm_community$string_extra$String$Extra$accentRegex = function () {
	var matches = _List_fromArray(
		[
			_Utils_Tuple2('[à-æ]', 'a'),
			_Utils_Tuple2('[À-Æ]', 'A'),
			_Utils_Tuple2('ç', 'c'),
			_Utils_Tuple2('Ç', 'C'),
			_Utils_Tuple2('[è-ë]', 'e'),
			_Utils_Tuple2('[È-Ë]', 'E'),
			_Utils_Tuple2('[ì-ï]', 'i'),
			_Utils_Tuple2('[Ì-Ï]', 'I'),
			_Utils_Tuple2('ñ', 'n'),
			_Utils_Tuple2('Ñ', 'N'),
			_Utils_Tuple2('[ò-ö]', 'o'),
			_Utils_Tuple2('[Ò-Ö]', 'O'),
			_Utils_Tuple2('[ù-ü]', 'u'),
			_Utils_Tuple2('[Ù-Ü]', 'U'),
			_Utils_Tuple2('ý', 'y'),
			_Utils_Tuple2('ÿ', 'y'),
			_Utils_Tuple2('Ý', 'Y')
		]);
	return A2(
		$elm$core$List$map,
		$elm$core$Tuple$mapFirst($elm_community$string_extra$String$Extra$regexFromString),
		matches);
}();
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm_community$string_extra$String$Extra$removeAccents = function (string) {
	if ($elm$core$String$isEmpty(string)) {
		return string;
	} else {
		var do_regex_to_remove_acents = function (_v1) {
			var regex = _v1.a;
			var replace_character = _v1.b;
			return A2(
				$elm$regex$Regex$replace,
				regex,
				function (_v0) {
					return replace_character;
				});
		};
		return A3($elm$core$List$foldl, do_regex_to_remove_acents, string, $elm_community$string_extra$String$Extra$accentRegex);
	}
};
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$trim = _String_trim;
var $author$project$Main$validateAttempt = F3(
	function (lang, word, input) {
		var normalize = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$toLower,
			A2(
				$elm$core$Basics$composeR,
				$elm$core$String$trim,
				A2(
					$elm$core$Basics$composeR,
					$elm_community$string_extra$String$Extra$removeAccents,
					A2($elm$core$String$replace, 'œ', 'oe'))));
		var _v0 = _Utils_Tuple2(
			$elm$core$String$toList(
				normalize(word)),
			$elm$core$String$toList(
				normalize(input)));
		var wordChars = _v0.a;
		var inputChars = _v0.b;
		return A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeR, $elm$core$Char$isAlpha, $elm$core$Basics$not),
			inputChars) ? $elm$core$Result$Err('The word must contains only alphabetic characters: ' + input) : (($elm$core$List$length(inputChars) !== 5) ? $elm$core$Result$Err('The word must be 5 letters long') : ((!A2(
			$elm$core$List$member,
			normalize(input),
			$author$project$Main$getWords(lang))) ? $elm$core$Result$Err(
			'Sorry, ' + (input + (' must be a known word from our ' + ($author$project$Main$langToString(lang) + ' dictionary')))) : $elm$core$Result$Ok(
			A2(
				$author$project$Main$handleMisplacedDuplicates,
				wordChars,
				A2(
					$author$project$Main$handleCorrectDuplicates,
					wordChars,
					A3(
						$elm$core$List$map2,
						$author$project$Main$mapChars(wordChars),
						inputChars,
						wordChars))))));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		update:
		while (true) {
			var _v0 = _Utils_Tuple2(msg, model.s);
			_v0$6:
			while (true) {
				switch (_v0.a.$) {
					case 0:
						var _v1 = _v0.a;
						var newModel = $author$project$Main$initialModel(model.h);
						return _Utils_Tuple2(
							newModel,
							A2(
								$elm$random$Random$generate,
								$author$project$Main$NewWord,
								$author$project$Main$randomWord(newModel.R)));
					case 1:
						if (!_v0.a.a.$) {
							if (!_v0.b.$) {
								var newWord = _v0.a.a.a;
								var _v2 = _v0.b;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											s: A4($author$project$Main$Ongoing, newWord, _List_Nil, '', $elm$core$Maybe$Nothing)
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								break _v0$6;
							}
						} else {
							if (!_v0.b.$) {
								var _v3 = _v0.a.a;
								var _v4 = _v0.b;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											s: $author$project$Main$Errored('Unable to pick a word.')
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								break _v0$6;
							}
						}
					case 4:
						if (_v0.b.$ === 2) {
							var newInput = _v0.a.a;
							var _v5 = _v0.b;
							var word = _v5.a;
							var attempts = _v5.b;
							var maybeError = _v5.d;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										s: A4($author$project$Main$Ongoing, word, attempts, newInput, maybeError)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							break _v0$6;
						}
					case 2:
						if (_v0.b.$ === 2) {
							var _v6 = _v0.a;
							var _v7 = _v0.b;
							var word = _v7.a;
							var attempts = _v7.b;
							var input = _v7.c;
							var _v8 = A3($author$project$Main$validateAttempt, model.h, word, input);
							if (!_v8.$) {
								var attempt = _v8.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											s: A2(
												$author$project$Main$checkGame,
												word,
												A2($elm$core$List$cons, attempt, attempts))
										}),
									$elm$core$Platform$Cmd$none);
							} else {
								var error = _v8.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{
											s: A4(
												$author$project$Main$Ongoing,
												word,
												attempts,
												input,
												$elm$core$Maybe$Just(error))
										}),
									$elm$core$Platform$Cmd$none);
							}
						} else {
							break _v0$6;
						}
					default:
						var lang = _v0.a.a;
						var $temp$msg = $author$project$Main$NewGame,
							$temp$model = _Utils_update(
							model,
							{h: lang});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
				}
			}
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						s: $author$project$Main$Errored('General game state error. This is bad.')
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$Submit = {$: 2};
var $author$project$Main$UpdateTry = function (a) {
	return {$: 4, a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Main$definitionLink = F2(
	function (lang, word) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('fw-bold'),
					$elm$html$Html$Attributes$href(
					function () {
						if (lang === 1) {
							return 'https://www.cnrtl.fr/definition/' + word;
						} else {
							return 'https://www.oxfordlearnersdictionaries.com/definition/english/' + word;
						}
					}()),
					$elm$html$Html$Attributes$title('Lookup the definition of this word (new window)'),
					$elm$html$Html$Attributes$target('_blank')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$elm$core$String$toUpper(word))
				]));
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Main$newGameButton = A2(
	$elm$html$Html$p,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('mt-3')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('btn btn-lg btn-primary w-100'),
					$elm$html$Html$Events$onClick($author$project$Main$NewGame)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Play again')
				]))
		]));
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Events$alwaysPreventDefault = function (msg) {
	return _Utils_Tuple2(msg, true);
};
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm$html$Html$Events$onSubmit = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'submit',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysPreventDefault,
			$elm$json$Json$Decode$succeed(msg)));
};
var $author$project$Main$SwitchLang = function (a) {
	return {$: 3, a: a};
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$Main$selectLang = function (lang) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('nav nav-pills nav-fill mb-3')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$li,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-item')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$class('nav-link'),
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('active', !lang)
									])),
								$elm$html$Html$Events$onClick(
								$author$project$Main$SwitchLang(0)),
								$elm$html$Html$Attributes$title('Switch to English dictionary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('English')
							]))
					])),
				A2(
				$elm$html$Html$li,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('nav-item')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$class('nav-link'),
								$elm$html$Html$Attributes$classList(
								_List_fromArray(
									[
										_Utils_Tuple2('active', lang === 1)
									])),
								$elm$html$Html$Events$onClick(
								$author$project$Main$SwitchLang(1)),
								$elm$html$Html$Attributes$title('Switch to French dictionary')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('French')
							]))
					]))
			]));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$core$String$fromList = _String_fromList;
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$core$Char$toUpper = _Char_toUpper;
var $author$project$Main$charToText = A2(
	$elm$core$Basics$composeR,
	$elm$core$Char$toUpper,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$List$singleton,
		A2($elm$core$Basics$composeR, $elm$core$String$fromList, $elm$html$Html$text)));
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Main$viewAttempt = function (attempt) {
	return A2(
		$elm$html$Html$tr,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (letter) {
				switch (letter.$) {
					case 2:
						var _char = letter.a;
						return A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('letter misplaced bg-warning')
								]),
							_List_fromArray(
								[
									$author$project$Main$charToText(_char)
								]));
					case 1:
						var _char = letter.a;
						return A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('letter correct bg-success')
								]),
							_List_fromArray(
								[
									$author$project$Main$charToText(_char)
								]));
					case 0:
						var _char = letter.a;
						return A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('letter unused bg-secondary')
								]),
							_List_fromArray(
								[
									$author$project$Main$charToText(_char)
								]));
					default:
						var _char = letter.a;
						return A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('letter handled bg-secondary')
								]),
							_List_fromArray(
								[
									$author$project$Main$charToText(_char)
								]));
				}
			},
			attempt));
};
var $author$project$Main$viewAttempts = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$reverse,
	A2(
		$elm$core$Basics$composeR,
		$elm$core$List$map($author$project$Main$viewAttempt),
		$elm$html$Html$table(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('table')
				]))));
var $author$project$Main$isUnusedChar = F2(
	function (_char, letter) {
		if (!letter.$) {
			var c = letter.a;
			return _Utils_eq(c, _char);
		} else {
			return false;
		}
	});
var $author$project$Main$keyboard = function (attempts) {
	return A2(
		$elm$core$List$map,
		function (c) {
			var _v0 = _Utils_Tuple3(
				A2(
					$elm$core$List$any,
					$elm$core$List$any(
						$author$project$Main$isCorrectChar(c)),
					attempts),
				A2(
					$elm$core$List$any,
					$elm$core$List$any(
						$author$project$Main$isMisplacedChar(c)),
					attempts),
				A2(
					$elm$core$List$any,
					$elm$core$List$any(
						$author$project$Main$isUnusedChar(c)),
					attempts));
			var hasCorrect = _v0.a;
			var hasMisplaced = _v0.b;
			var hasUnused = _v0.c;
			return _Utils_Tuple2(
				c,
				hasCorrect ? $elm$core$Maybe$Just(
					$author$project$Main$Correct(c)) : (hasMisplaced ? $elm$core$Maybe$Just(
					$author$project$Main$Misplaced(c)) : (hasUnused ? $elm$core$Maybe$Just(
					$author$project$Main$Unused(c)) : $elm$core$Maybe$Nothing)));
		},
		$elm$core$String$toList('abcdefghijklmnopqrstuvwxyz'));
};
var $author$project$Main$viewKeyboard = function (attempts) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mb-3')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('d-flex w-100 justify-content-between fw-bold')
					]),
				A2(
					$elm$core$List$map,
					function (_v0) {
						var _char = _v0.a;
						var letter = _v0.b;
						_v1$3:
						while (true) {
							if (!letter.$) {
								switch (letter.a.$) {
									case 1:
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-success')
												]),
											_List_fromArray(
												[
													$author$project$Main$charToText(_char)
												]));
									case 2:
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-warning')
												]),
											_List_fromArray(
												[
													$author$project$Main$charToText(_char)
												]));
									case 0:
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-decoration-line-through text-secondary')
												]),
											_List_fromArray(
												[
													$author$project$Main$charToText(_char)
												]));
									default:
										break _v1$3;
								}
							} else {
								break _v1$3;
							}
						}
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Main$charToText(_char)
								]));
					},
					$author$project$Main$keyboard(attempts)))
			]));
};
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Main$selectLang(model.h),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Guess a 5 letters '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Main$langToString(model.h))
							])),
						$elm$html$Html$text(' word in '),
						A2(
						$elm$html$Html$strong,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt($author$project$Main$maxAttempts))
							])),
						$elm$html$Html$text(' attempts or less!')
					])),
				function () {
				var _v0 = model.s;
				switch (_v0.$) {
					case 0:
						return $elm$html$Html$text('Loading game…');
					case 1:
						var gameError = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('alert alert-info')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Game data couldn\'t be loaded:'),
											$elm$html$Html$text(gameError)
										])),
									$author$project$Main$newGameButton
								]));
					case 4:
						var word = _v0.a;
						var attempts = _v0.b;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Main$viewAttempts(attempts),
									A2(
									$elm$html$Html$h3,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('You have guessed '),
											A2($author$project$Main$definitionLink, model.h, word),
											($elm$core$List$length(attempts) === 1) ? A2(
											$elm$html$Html$strong,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(' on your first try, congrats!')
												])) : A2(
											$elm$html$Html$span,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text(' in '),
													A2(
													$elm$html$Html$strong,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(
															$elm$core$String$fromInt(
																$elm$core$List$length(attempts)))
														])),
													$elm$html$Html$text(' attempts!')
												]))
										])),
									$author$project$Main$newGameButton
								]));
					case 3:
						var word = _v0.a;
						var attempts = _v0.b;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Main$viewAttempts(attempts),
									A2(
									$elm$html$Html$h3,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mb-3')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('This one was hard!')
										])),
									A2(
									$elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('The word to guess was '),
											A2($author$project$Main$definitionLink, model.h, word),
											$elm$html$Html$text('.')
										])),
									$author$project$Main$viewKeyboard(attempts),
									$author$project$Main$newGameButton
								]));
					default:
						var attempts = _v0.b;
						var input = _v0.c;
						var maybeError = _v0.d;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$author$project$Main$viewAttempts(attempts),
									$author$project$Main$viewKeyboard(attempts),
									function () {
									if (!maybeError.$) {
										var error = maybeError.a;
										return A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('alert alert-info')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(error)
												]));
									} else {
										return $elm$html$Html$text('');
									}
								}(),
									A2(
									$elm$html$Html$form,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('input-group'),
											$elm$html$Html$Events$onSubmit($author$project$Main$Submit)
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$input,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('text'),
													$elm$html$Html$Attributes$class('form-control'),
													$elm$html$Html$Attributes$maxlength(5),
													$elm$html$Html$Events$onInput($author$project$Main$UpdateTry),
													$elm$html$Html$Attributes$value(input)
												]),
											_List_Nil),
											A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('btn btn-primary')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Envoyer')
												]))
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('form-text')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											'Enter a 5 letters ' + ($author$project$Main$langToString(model.h) + ' word'))
										]))
								]));
				}
			}()
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		a7: $author$project$Main$init,
		bs: $elm$core$Basics$always($elm$core$Platform$Sub$none),
		bw: $author$project$Main$update,
		bx: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (lang) {
			return $elm$json$Json$Decode$succeed(
				{h: lang});
		},
		A2($elm$json$Json$Decode$field, 'lang', $elm$json$Json$Decode$string)))(0)}});}(this));