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
	if (region.bB.aD === region.bS.aD)
	{
		return 'on line ' + region.bB.aD;
	}
	return 'on lines ' + region.bB.aD + ' through ' + region.bS.aD;
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
		impl.dv,
		impl.es,
		impl.d9,
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
		cb: func(record.cb),
		cC: record.cC,
		co: record.co
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
		var message = !tag ? value : tag < 3 ? value.a : value.cb;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.cC;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.co) && event.preventDefault(),
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
		impl.dv,
		impl.es,
		impl.d9,
		function(sendToApp, initialModel) {
			var view = impl.ev;
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
		impl.dv,
		impl.es,
		impl.d9,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bu && impl.bu(sendToApp)
			var view = impl.ev;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.cX);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.ef) && (_VirtualDom_doc.title = title = doc.ef);
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
	var onUrlChange = impl.dS;
	var onUrlRequest = impl.dT;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bu: function(sendToApp)
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
							&& curr.cs === next.cs
							&& curr.b1 === next.b1
							&& curr.cl.a === next.cl.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		dv: function(flags)
		{
			return A3(impl.dv, flags, _Browser_getUrl(), key);
		},
		ev: impl.ev,
		es: impl.es,
		d9: impl.d9
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
		? { dp: 'hidden', c0: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dp: 'mozHidden', c0: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dp: 'msHidden', c0: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dp: 'webkitHidden', c0: 'webkitvisibilitychange' }
		: { dp: 'hidden', c0: 'visibilitychange' };
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
		d3: _Browser_getScene(),
		cI: {
			cM: _Browser_window.pageXOffset,
			cN: _Browser_window.pageYOffset,
			cL: _Browser_doc.documentElement.clientWidth,
			$7: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		cL: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		$7: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			d3: {
				cL: node.scrollWidth,
				$7: node.scrollHeight
			},
			cI: {
				cM: node.scrollLeft,
				cN: node.scrollTop,
				cL: node.clientWidth,
				$7: node.clientHeight
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
			d3: _Browser_getScene(),
			cI: {
				cM: x,
				cN: y,
				cL: _Browser_doc.documentElement.clientWidth,
				$7: _Browser_doc.documentElement.clientHeight
			},
			dc: {
				cM: x + rect.left,
				cN: y + rect.top,
				cL: rect.width,
				$7: rect.height
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
	if (options.dF) { flags += 'm'; }
	if (options.c$) { flags += 'i'; }

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




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && $elm$core$Maybe$isJust(options.bR))
		{
			lang = options.bR.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.dk.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.ea,
		breaks: gfm && gfm.c_,
		sanitize: options.d2,
		smartypants: options.d5
	};
}
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
		if (!builder.p) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.t),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.t);
		} else {
			var treeLen = builder.p * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.u) : builder.u;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.p);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.t) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.t);
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
					{u: nodeList, p: (len / $elm$core$Array$branchFactor) | 0, t: tail});
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
		return {bY: fragment, b1: host, cj: path, cl: port_, cs: protocol, ct: query};
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
var $author$project$Main$DecodeError = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$Errored = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Main$Store = F2(
	function (lang, logs) {
		return {ac: lang, as: logs};
	});
var $author$project$Main$Log = F5(
	function (time, lang, word, victory, guesses) {
		return {dn: guesses, ac: lang, ax: time, eu: victory, ex: word};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$I18n$English = 0;
var $author$project$I18n$French = 1;
var $author$project$I18n$langFromString = function (string) {
	if (string === 'Français') {
		return 1;
	} else {
		return 0;
	}
};
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Main$decodeLog = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Main$Log,
	A2(
		$elm$json$Json$Decode$field,
		'time',
		A2($elm$json$Json$Decode$map, $elm$time$Time$millisToPosix, $elm$json$Json$Decode$int)),
	A2(
		$elm$json$Json$Decode$field,
		'lang',
		A2($elm$json$Json$Decode$map, $author$project$I18n$langFromString, $elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'word', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'victory', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'guesses', $elm$json$Json$Decode$int));
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Main$decodeStore = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Main$Store,
	A2(
		$elm$json$Json$Decode$field,
		'lang',
		A2($elm$json$Json$Decode$map, $author$project$I18n$langFromString, $elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'logs',
		$elm$json$Json$Decode$list($author$project$Main$decodeLog)));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $author$project$Main$defaultStore = function (lang) {
	return {ac: lang, as: _List_Nil};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$I18n$langToString = function (lang) {
	if (!lang) {
		return 'English';
	} else {
		return 'Français';
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$encodeLog = function (log) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'time',
				$elm$json$Json$Encode$int(
					$elm$time$Time$posixToMillis(log.ax))),
				_Utils_Tuple2(
				'lang',
				$elm$json$Json$Encode$string(
					$author$project$I18n$langToString(log.ac))),
				_Utils_Tuple2(
				'word',
				$elm$json$Json$Encode$string(log.ex)),
				_Utils_Tuple2(
				'victory',
				$elm$json$Json$Encode$bool(log.eu)),
				_Utils_Tuple2(
				'guesses',
				$elm$json$Json$Encode$int(log.dn))
			]));
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $author$project$Main$encodeStore = function (store) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'lang',
				$elm$json$Json$Encode$string(
					$author$project$I18n$langToString(store.ac))),
				_Utils_Tuple2(
				'logs',
				A2($elm$json$Json$Encode$list, $author$project$Main$encodeLog, store.as))
			]));
};
var $author$project$Main$saveStore = _Platform_outgoingPort('saveStore', $elm$json$Json$Encode$string);
var $author$project$Main$encodeAndSaveStore = A2(
	$elm$core$Basics$composeR,
	$author$project$Main$encodeStore,
	A2(
		$elm$core$Basics$composeR,
		$elm$json$Json$Encode$encode(0),
		$author$project$Main$saveStore));
var $author$project$Main$NewWord = function (a) {
	return {$: 5, a: a};
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
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
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
var $author$project$Words$english = A2($elm$core$String$split, ',', 'which,there,their,about,would,these,other,words,could,write,first,water,after,where,right,think,three,years,place,sound,great,again,still,every,small,found,those,never,under,might,while,house,world,below,asked,going,large,until,along,shall,being,often,earth,began,since,study,night,light,above,paper,parts,young,story,point,times,heard,whole,white,given,means,music,miles,thing,today,later,using,money,lines,order,group,among,learn,known,space,table,early,trees,short,hands,state,black,shown,stood,front,voice,kinds,makes,comes,close,power,lived,vowel,taken,built,heart,ready,quite,class,bring,round,horse,shows,piece,green,stand,birds,start,river,tried,least,field,whose,girls,leave,added,color,third,hours,moved,plant,doing,names,forms,heavy,ideas,cried,check,floor,begin,woman,alone,plane,spell,watch,carry,wrote,clear,named,books,child,glass,human,takes,party,build,seems,blood,sides,seven,mouth,solve,north,value,death,maybe,happy,tells,gives,looks,shape,lives,steps,areas,sense,speak,force,ocean,speed,women,metal,south,grass,scale,cells,lower,sleep,wrong,pages,ships,needs,rocks,eight,major,level,total,ahead,reach,stars,store,sight,terms,catch,works,board,cover,songs,equal,stone,waves,guess,dance,spoke,break,cause,radio,weeks,lands,basic,liked,trade,fresh,final,fight,meant,drive,spent,local,waxes,knows,train,bread,homes,teeth,coast,thick,brown,clean,quiet,sugar,facts,steel,forth,rules,notes,units,peace,month,verbs,seeds,helps,sharp,visit,woods,chief,walls,cross,wings,grown,cases,foods,crops,fruit,stick,wants,stage,sheep,nouns,plain,drink,bones,apart,turns,moves,touch,angle,based,range,marks,tired,older,farms,spend,shoes,goods,chair,twice,cents,empty,alike,style,broke,pairs,count,enjoy,score,shore,roots,paint,heads,shook,serve,angry,crowd,wheel,quick,dress,share,alive,noise,solid,cloth,signs,hills,types,drawn,worth,truck,piano,upper,loved,usual,faces,drove,cabin,boats,towns,proud,court,model,prime,fifty,plans,yards,prove,tools,price,sheet,smell,boxes,raise,match,truth,roads,threw,enemy,lunch,chart,scene,graph,doubt,guide,winds,block,grain,smoke,mixed,games,wagon,sweet,topic,extra,plate,title,knife,fence,falls,cloud,wheat,plays,enter,broad,steam,atoms,press,lying,basis,clock,taste,grows,thank,storm,agree,brain,track,smile,funny,beach,stock,hurry,saved,sorry,giant,trail,offer,ought,rough,daily,avoid,keeps,throw,allow,cream,laugh,edges,teach,frame,bells,dream,magic,occur,ended,chord,false,skill,holes,dozen,brave,apple,climb,outer,pitch,ruler,holds,fixed,costs,calls,blank,staff,labor,eaten,youth,tones,honor,globe,gases,doors,poles,loose,apply,tears,exact,brush,chest,layer,whale,minor,faith,tests,judge,items,worry,waste,hoped,strip,begun,aside,lakes,bound,depth,candy,event,worse,aware,shell,rooms,ranch,image,snake,aloud,dried,likes,motor,pound,knees,refer,fully,chain,shirt,flour,drops,spite,orbit,banks,shoot,curve,tribe,tight,blind,slept,shade,claim,flies,theme,queen,fifth,union,hence,straw,entry,issue,birth,feels,anger,brief,rhyme,glory,guard,flows,flesh,owned,trick,yours,sizes,noted,width,burst,route,lungs,uncle,bears,royal,kings,forty,trial,cards,brass,opera,chose,owner,vapor,beats,mouse,tough,wires,meter,tower,finds,inner,stuck,arrow,poems,label,swing,solar,truly,tense,beans,split,rises,weigh,hotel,stems,pride,swung,grade,digit,badly,boots,pilot,sales,swept,lucky,prize,stove,tubes,acres,wound,steep,slide,trunk,error,porch,slave,exist,faced,mines,marry,juice,raced,waved,goose,trust,fewer,favor,mills,views,joint,eager,spots,blend,rings,adult,index,nails,horns,balls,flame,rates,drill,trace,skins,waxed,seats,stuff,ratio,minds,dirty,silly,coins,hello,trips,leads,rifle,hopes,bases,shine,bench,moral,fires,meals,shake,shops,cycle,movie,slope,canoe,teams,folks,fired,bands,thumb,shout,canal,habit,reply,ruled,fever,crust,shelf,walks,midst,crack,print,tales,coach,stiff,flood,verse,awake,rocky,march,fault,swift,faint,civil,ghost,feast,blade,limit,germs,reads,ducks,dairy,worst,gifts,lists,stops,rapid,brick,claws,beads,beast,skirt,cakes,lions,frogs,tries,nerve,grand,armed,treat,honey,moist,legal,penny,crown,shock,taxes,sixty,altar,pulls,sport,drums,talks,dying,dates,drank,blows,lever,wages,proof,drugs,tanks,sings,tails,pause,herds,arose,hated,clues,novel,shame,burnt,races,flash,weary,heels,token,coats,spare,shiny,alarm,dimes,sixth,clerk,mercy,sunny,guest,float,shone,pipes,worms,bills,sweat,suits,smart,upset,rains,sandy,rainy,parks,sadly,fancy,rider,unity,bunch,rolls,crash,craft,newly,gates,hatch,paths,funds,wider,grace,grave,tides,admit,shift,sails,pupil,tiger,angel,cruel,agent,drama,urged,patch,nests,vital,sword,blame,weeds,screw,vocal,bacon,chalk,cargo,crazy,acted,goats,arise,witch,loves,queer,dwell,backs,ropes,shots,merry,phone,cheek,peaks,ideal,beard,eagle,creek,cries,ashes,stall,yield,mayor,opens,input,fleet,tooth,cubic,wives,burns,poets,apron,spear,organ,cliff,stamp,paste,rural,baked,chase,slice,slant,knock,noisy,sorts,stays,wiped,blown,piled,clubs,cheer,widow,twist,tenth,hides,comma,sweep,spoon,stern,crept,maple,deeds,rides,muddy,crime,jelly,ridge,drift,dusty,devil,tempo,humor,sends,steal,tents,waist,roses,reign,noble,cheap,dense,linen,geese,woven,posts,hired,wrath,salad,bowed,tires,shark,belts,grasp,blast,polar,fungi,tends,pearl,loads,jokes,veins,frost,hears,loses,hosts,diver,phase,toads,alert,tasks,seams,coral,focus,naked,puppy,jumps,spoil,quart,macro,fears,flung,spark,vivid,brook,steer,spray,decay,ports,socks,urban,goals,grant,minus,films,tunes,shaft,firms,skies,bride,wreck,flock,stare,hobby,bonds,dared,faded,thief,crude,pants,flute,votes,tonal,radar,wells,skull,hairs,argue,wears,dolls,voted,caves,cared,broom,scent,panel,fairy,olive,bends,prism,lamps,cable,peach,ruins,rally,schwa,lambs,sells,cools,draft,charm,limbs,brake,gazed,cubes,delay,beams,fetch,ranks,array,harsh,camel,vines,picks,naval,purse,rigid,crawl,toast,soils,sauce,basin,ponds,twins,wrist,fluid,pools,brand,stalk,robot,reeds,hoofs,buses,sheer,grief,bloom,dwelt,melts,risen,flags,knelt,fiber,roofs,freed,armor,piles,aimed,algae,twigs,lemon,ditch,drunk,rests,chill,slain,panic,cords,tuned,crisp,ledge,dived,swamp,clung,stole,molds,yarns,liver,gauge,breed,stool,gulls,awoke,gross,diary,rails,belly,trend,flask,stake,fried,draws,actor,handy,bowls,haste,scope,deals,knots,moons,essay,thump,hangs,bliss,dealt,gains,bombs,clown,palms,cones,roast,tidal,bored,chant,acids,dough,camps,swore,lover,hooks,males,cocoa,punch,award,reins,ninth,noses,links,drain,fills,nylon,lunar,pulse,flown,elbow,fatal,sites,moths,meats,foxes,mined,attic,fiery,mount,usage,swear,snowy,rusty,scare,traps,relax,react,valid,robin,cease,gills,prior,safer,polio,loyal,swell,salty,marsh,vague,weave,mound,seals,mules,virus,scout,acute,windy,stout,folds,seize,hilly,joins,pluck,stack,lords,dunes,burro,hawks,trout,feeds,scarf,halls,coals,towel,souls,elect,buggy,pumps,loans,spins,files,oxide,pains,photo,rival,flats,syrup,rodeo,sands,moose,pints,curly,comic,cloak,onion,clams,scrap,didst,couch,codes,fails,ounce,lodge,greet,gypsy,utter,paved,zones,fours,alley,tiles,bless,crest,elder,kills,yeast,erect,bugle,medal,roles,hound,snail,alter,ankle,relay,loops,zeros,bites,modes,debts,realm,glove,rayon,swims,poked,stray,lifts,maker,lumps,graze,dread,barns,docks,masts,pours,wharf,curse,plump,robes,seeks,cedar,curls,jolly,myths,cages,gloom,locks,pedal,beets,crows,anode,slash,creep,rowed,chips,fists,wines,cares,valve,newer,motel,ivory,necks,clamp,barge,blues,alien,frown,strap,crews,shack,gonna,saves,stump,ferry,idols,cooks,juicy,glare,carts,alloy,bulbs,lawns,lasts,fuels,oddly,crane,filed,weird,shawl,slips,troop,bolts,suite,sleek,quilt,tramp,blaze,atlas,odors,scrub,crabs,probe,logic,adobe,exile,rebel,grind,sting,spine,cling,desks,grove,leaps,prose,lofty,agony,snare,tusks,bulls,moods,humid,finer,dimly,plank,china,pines,guilt,sacks,brace,quote,lathe,gaily,fonts,scalp,adopt,foggy,ferns,grams,clump,perch,tumor,teens,crank,fable,hedge,genes,sober,boast,tract,cigar,unite,owing,thigh,haiku,swish,dikes,wedge,booth,eased,frail,cough,tombs,darts,forts,choir,pouch,pinch,hairy,buyer,torch,vigor,waltz,heats,herbs,users,flint,click,madam,bleak,blunt,aided,lacks,masks,waded,risks,nurse,chaos,sewed,cured,ample,lease,steak,sinks,merit,bluff,bathe,gleam,bonus,colts,shear,gland,silky,skate,birch,anvil,sleds,groan,maids,meets,speck,hymns,hints,drown,bosom,slick,quest,coils,spied,snows,stead,snack,plows,blond,tamed,thorn,waits,glued,banjo,tease,arena,bulky,carve,stunt,warms,shady,razor,folly,leafy,notch,fools,otter,pears,flush,genus,ached,fives,flaps,spout,smote,fumes,adapt,cuffs,tasty,stoop,clips,disks,sniff,lanes,brisk,imply,demon,super,furry,raged,growl,texts,hardy,stung,typed,hates,wiser,timid,serum,beaks,rotor,casts,baths,glide,plots,trait,resin,slums,lyric,puffs,decks,brood,mourn,aloft,abuse,whirl,edged,ovary,quack,heaps,slang,await,civic,saint,bevel,sonar,aunts,packs,froze,tonic,corps,swarm,frank,repay,gaunt,wired,niece,cello,needy,chuck,stony,media,surge,hurts,repel,husky,dated,hunts,mists,exert,dries,mates,sworn,baker,spice,oasis,boils,spurs,doves,sneak,paces,colon,siege,strum,drier,cacao,humus,bales,piped,nasty,rinse,boxer,shrub,amuse,tacks,cited,slung,delta,laden,larva,rents,yells,spool,spill,crush,jewel,snaps,stain,kicks,tying,slits,rated,eerie,smash,plums,zebra,earns,bushy,scary,squad,tutor,silks,slabs,bumps,evils,fangs,snout,peril,pivot,yacht,lobby,jeans,grins,viola,liner,comet,scars,chops,raids,eater,slate,skips,soles,misty,urine,knobs,sleet,holly,pests,forks,grill,trays,pails,borne,tenor,wares,carol,woody,canon,wakes,kitty,miner,polls,shaky,nasal,scorn,chess,taxis,crate,shyly,tulip,forge,nymph,budge,lowly,abide,depot,oases,asses,sheds,fudge,pills,rivet,thine,groom,lanky,boost,broth,heave,gravy,beech,timed,quail,inert,gears,chick,hinge,trash,clash,sighs,renew,bough,dwarf,slows,quill,shave,spore,sixes,chunk,madly,paced,braid,fuzzy,motto,spies,slack,mucus,magma,awful,discs,erase,posed,asset,cider,taper,theft,churn,satin,slots,taxed,bully,sloth,shale,tread,raked,curds,manor,aisle,bulge,loins,stair,tapes,leans,bunks,squat,towed,lance,panes,sakes,heirs,caste,dummy,pores,fauna,crook,poise,epoch,risky,warns,fling,berry,grape,flank,drags,squid,pelts,icing,irony,irons,barks,whoop,choke,diets,whips,tally,dozed,twine,kites,bikes,ticks,riots,roars,vault,looms,scold,blink,dandy,pupae,sieve,spike,ducts,lends,pizza,brink,widen,plumb,pagan,feats,bison,soggy,scoop,argon,nudge,skiff,amber,sexes,rouse,salts,hitch,exalt,leash,dined,chute,snort,gusts,melon,cheat,reefs,llama,lasso,debut,quota,oaths,prone,mixes,rafts,dives,stale,inlet,flick,pinto,brows,untie,batch,greed,chore,stirs,blush,onset,barbs,volts,beige,swoop,paddy,laced,shove,jerky,poppy,leaks,fares,dodge,godly,squaw,affix,brute,nicer,undue,snarl,merge,doses,showy,daddy,roost,vases,swirl,petty,colds,curry,cobra,genie,flare,messy,cores,soaks,ripen,whine,amino,plaid,spiny,mowed,baton,peers,vowed,pious,swans,exits,afoot,plugs,idiom,chili,rites,serfs,cleft,berth,grubs,annex,dizzy,hasty,latch,wasps,mirth,baron,plead,aloof,aging,pixel,bared,mummy,hotly,auger,buddy,chaps,badge,stark,fairs,gully,mumps,emery,filly,ovens,drone,gauze,idiot,fussy,annoy,shank,gouge,bleed,elves,roped,unfit,baggy,mower,scant,grabs,fleas,lousy,album,sawed,cooky,murky,infer,burly,waged,dingy,brine,kneel,creak,vanes,smoky,spurt,combs,easel,laces,humps,rumor,aroma,horde,swiss,leapt,opium,slime,afire,pansy,mares,soaps,husks,snips,hazel,lined,cafes,naive,wraps,sized,piers,beset,agile,tongs,steed,fraud,booty,valor,downy,witty,mossy,psalm,scuba,tours,polka,milky,gaudy,shrug,tufts,wilds,laser,truss,hares,creed,lilac,siren,tarry,bribe,swine,muted,flips,cures,sinew,boxed,hoops,gasps,hoods,niche,yucca,glows,sewer,whack,fuses,gowns,droop,bucks,pangs,mails,whisk,haven,clasp,sling,stint,urges,champ,piety,chirp,pleat,posse,sunup,menus,howls,quake,knack,plaza,fiend,caked,bangs,erupt,poker,olden,cramp,voter,poses,manly,slump,fined,grips,gaped,purge,hiked,maize,fluff,strut,sloop,prowl,roach,cocks,bland,dials,plume,slaps,soups,dully,wills,foams,solos,skier,eaves,totem,fused,latex,veils,mused,mains,myrrh,racks,galls,gnats,bouts,sisal,shuts,hoses,dryly,hover,gloss,seeps,denim,putty,guppy,leaky,dusky,filth,oboes,spans,fowls,adorn,glaze,haunt,dares,obeys,bakes,abyss,smelt,gangs,aches,trawl,claps,undid,spicy,hoist,fades,vicar,acorn,pussy,gruff,musty,tarts,snuff,hunch,truce,tweed,dryer,loser,sheaf,moles,lapse,tawny,vexed,autos,wager,domes,sheen,clang,spade,sowed,broil,slyly,studs,grunt,donor,slugs,aspen,homer,croak,tithe,halts,avert,havoc,hogan,glint,ruddy,jeeps,flaky,ladle,taunt,snore,fines,props,prune,pesos,radii,pokes,tiled,daisy,heron,villa,farce,binds,cites,fixes,jerks,livid,waked,inked,booms,chews,licks,hyena,scoff,lusty,sonic,smith,usher,tucks,vigil,molts,sects,spars,dumps,scaly,wisps,sores,mince,panda,flier,axles,plied,booby,patio,rabbi,petal,polyp,tints,grate,troll,tolls,relic,phony,bleat,flaws,flake,snags,aptly,drawl,ulcer,soapy,bossy,monks,crags,caged,twang,diner,taped,cadet,grids,spawn,guile,noose,mores,girth,slimy,aides,spasm,burrs,alibi,lymph,saucy,muggy,liter,joked,goofy,exams,enact,stork,lured,toxic,omens,nears,covet,wrung,forum,venom,moody,alder,sassy,flair,guild,prays,wrens,hauls,stave,tilts,pecks,stomp,gales,tempt,capes,mesas,omits,tepee,harry,wring,evoke,limes,cluck,lunge,highs,canes,giddy,lithe,verge,khaki,queue,loath,foyer,outdo,fared,deter,crumb,astir,spire,jumpy,extol,buoys,stubs,lucid,thong,afore,whiff,maxim,hulls,clogs,slats,jiffy,arbor,cinch,igloo,goody,gazes,dowel,calms,bitch,scowl,gulps,coded,waver,mason,lobes,ebony,flail,isles,clods,dazed,adept,oozed,sedan,clays,warts,ketch,skunk,manes,adore,sneer,mango,fiord,flora,roomy,minks,thaws,watts,freer,exult,plush,paled,twain,clink,scamp,pawed,grope,bravo,gable,stink,sever,waned,rarer,regal,wards,fawns,babes,unify,amend,oaken,glade,visor,hefty,nines,throb,pecan,butts,pence,sills,jails,flyer,saber,nomad,miter,beeps,domed,gulfs,curbs,heath,moors,aorta,larks,tangy,wryly,cheep,rages,evade,lures,freak,vogue,tunic,slams,knits,dumpy,mania,spits,firth,hikes,trots,nosed,clank,dogma,bloat,balsa,graft,middy,stile,keyed,finch,sperm,chaff,wiles,amigo,copra,amiss,eying,twirl,lurch,popes,chins,smock,tines,guise,grits,junks,shoal,cache,tapir,atoll,deity,toils,spree,mocks,scans,shorn,revel,raven,hoary,reels,scuff,mimic,weedy,corny,truer,rouge,ember,floes,torso,wipes,edict,sulky,recur,groin,baste,kinks,surer,piggy,moldy,franc,liars,inept,gusty,facet,jetty,equip,leper,slink,soars,cater,dowry,sided,yearn,decoy,taboo,ovals,heals,pleas,beret,spilt,gayly,rover,endow,pygmy,carat,abbey,vents,waken,chimp,fumed,sodas,vinyl,clout,wades,mites,smirk,bores,bunny,surly,frock,foray,purer,milks,query,mired,blare,froth,gruel,navel,paler,puffy,casks,grime,derby,mamma,gavel,teddy,vomit,moans,allot,defer,wield,viper,louse,erred,hewed,abhor,wrest,waxen,adage,ardor,stabs,pored,rondo,loped,fishy,bible,hires,foals,feuds,jambs,thuds,jeers,knead,quirk,rugby,expel,greys,rigor,ester,lyres,aback,glues,lotus,lurid,rungs,hutch,thyme,valet,tommy,yokes,epics,trill,pikes,ozone,caper,chime,frees,famed,leech,smite,neigh,erode,robed,hoard,salve,conic,gawky,craze,jacks,gloat,mushy,rumps,fetus,wince,pinks,shalt,toots,glens,cooed,rusts,stews,shred,parka,chugs,winks,clots,shrew,booed,filmy,juror,dents,gummy,grays,hooky,butte,dogie,poled,reams,fifes,spank,gayer,tepid,spook,taint,flirt,rogue,spiky,opals,miser,cocky,coyly,balmy,slosh,brawl,aphid,faked,hydra,brags,chide,yanks,allay,video,altos,eases,meted,chasm,longs,excel,taffy,impel,savor,koala,quays,dawns,proxy,clove,duets,dregs,tardy,briar,grimy,ultra,meaty,halve,wails,suede,mauve,envoy,arson,coves,gooey,brews,sofas,chums,amaze,zooms,abbot,halos,scour,suing,cribs,sagas,enema,wordy,harps,coupe,molar,flops,weeps,mints,ashen,felts,askew,munch,mewed,divan,vices,jumbo,blobs,blots,spunk,acrid,topaz,cubed,clans,flees,slurs,gnaws,welds,fords,emits,agate,pumas,mends,darks,dukes,plies,canny,hoots,oozes,lamed,fouls,clefs,nicks,mated,skims,brunt,tuber,tinge,fates,ditty,thins,frets,eider,bayou,mulch,fasts,amass,damps,morns,friar,palsy,vista,croon,conch,udder,tacos,skits,mikes,quits,preen,aster,adder,elegy,pulpy,scows,baled,hovel,lavas,crave,optic,welts,busts,knave,razed,shins,totes,scoot,dears,crock,mutes,trims,skein,doted,shuns,veers,fakes,yoked,wooed,hacks,sprig,wands,lulls,seers,snobs,nooks,pined,perky,mooed,frill,dines,booze,tripe,prong,drips,odder,levee,antic,sidle,pithy,corks,yelps,joker,fleck,buffs,scram,tiers,bogey,doled,irate,vales,coped,hails,elude,bulks,aired,vying,stags,strew,cocci,pacts,scabs,silos,dusts,yodel,terse,jaded,baser,jibes,foils,sways,forgo,slays,preys,treks,quell,peeks,assay,lurks,eject,boars,trite,belch,gnash,wanes,lutes,whims,dosed,chewy,snipe,umbra,teems,dozes,kelps,upped,brawn,doped,shush,rinds,slush,moron,voile,woken,fjord,sheik,jests,kayak,slews,toted,saner,drape,patty,raves,sulfa,grist,skied,vixen,civet,vouch,tiara,homey,moped,runts,serge,kinky,rills,corns,brats,pries,amble,fries,loons,tsars,datum,musky,pigmy,gnome,ravel,ovule,icily,liken,lemur,frays,silts,sifts,plods,ramps,tress,earls,dudes,waive,karat,jolts,peons,beers,horny,pales,wreak,lairs,lynch,stank,swoon,idler,abort,blitz,ensue,atone,bingo,roves,kilts,scald,adios,cynic,dulls,memos,elfin,dales,peels,peals,bares,sinus,crone,sable,hinds,shirk,enrol,wilts,roams,duped,cysts,mitts,safes,spats,coops,filet,knell,refit,covey,punks,kilns,fitly,abate,talcs,heeds,duels,wanly,ruffs,gauss,lapel,jaunt,whelp,cleat,gauzy,dirge,edits,wormy,moats,smear,prods,bowel,frisk,vests,bayed,rasps,tames,delve,embed,befit,wafer,ceded,novas,feign,spews,larch,huffs,doles,mamas,hulks,pried,brims,irked,aspic,swipe,mealy,skimp,bluer,slake,dowdy,penis,brays,pupas,egret,flunk,phlox,gripe,peony,douse,blurs,darns,slunk,lefts,chats,inane,vials,stilt,rinks,woofs,wowed,bongs,frond,ingot,evict,singe,shyer,flied,slops,dolts,drool,dells,whelk,hippy,feted,ether,cocos,hives,jibed,mazes,trios,sirup,squab,laths,leers,pasta,rifts,lopes,alias,whirs,diced,slags,lodes,foxed,idled,prows,plait,malts,chafe,cower,toyed,chefs,keels,sties,racer,etude,sucks,sulks,micas,czars,copse,ailed,abler,rabid,golds,croup,snaky,visas,palls,mopes,boned,wispy,raved,swaps,junky,doily,pawns,tamer,poach,baits,damns,gumbo,daunt,prank,hunks,buxom,heres,honks,stows,unbar,idles,routs,sages,goads,remit,copes,deign,culls,girds,haves,lucks,stunk,dodos,shams,snubs,icons,usurp,dooms,hells,soled,comas,paves,maths,perks,limps,wombs,blurb,daubs,cokes,sours,stuns,cased,musts,coeds,cowed,aping,zoned,rummy,fetes,skulk,quaff,rajah,deans,reaps,galas,tills,roved,kudos,toned,pared,scull,vexes,punts,snoop,bails,dames,hazes,lores,marts,voids,ameba,rakes,adzes,harms,rears,satyr,swill,hexes,colic,leeks,hurls,yowls,ivies,plops,musks,papaw,jells,bused,cruet,bided,filch,zests,rooks,laxly,rends,loams,basks,sires,carps,pokey,flits,muses,bawls,shuck,viler,lisps,peeps,sorer,lolls,prude,diked,floss,flogs,scums,dopes,bogie,pinky,leafs,tubas,scads,lowed,yeses,biked,qualm,evens,caned,gawks,whits,wooly,gluts,romps,bests,dunce,crony,joist,tunas,boner,malls,parch,avers,crams,pares,dally,bigot,kales,flays,leach,gushy,pooch,huger,slyer,golfs,mires,flues,loafs,arced,acnes,neons,fiefs,dints,dazes,pouts,cored,yules,lilts,beefs,mutts,fells,cowls,spuds,lames,jawed,dupes,deads,bylaw,noons,nifty,clued,vireo,gapes,metes,cuter,maims,droll,cupid,mauls,sedge,papas,wheys,eking,loots,hilts,meows,beaus,dices,peppy,riper,fogey,gists,yogas,gilts,skews,cedes,zeals,alums,okays,elope,grump,wafts,soots,blimp,hefts,mulls,hosed,cress,doffs,ruder,pixie,waifs,ousts,pucks,biers,gulch,suets,hobos,lints,brans,teals,garbs,pewee,helms,turfs,quips,wends,banes,napes,icier,swats,bagel,hexed,ogres,goner,gilds,pyres,lards,bides,paged,talon,flout,medic,veals,putts,dirks,dotes,tippy,blurt,piths,acing,barer,whets,gaits,wools,dunks,heros,swabs,dirts,jutes,hemps,surfs,okapi,chows,shoos,dusks,parry,decal,furls,cilia,sears,novae,murks,warps,slues,lamer,saris,weans,purrs,dills,togas,newts,meany,bunts,razes,goons,wicks,ruses,vends,geode,drake,judos,lofts,pulps,lauds,mucks,vises,mocha,oiled,roman,ethyl,gotta,fugue,smack,gourd,bumpy,radix,fatty,borax,cubit,cacti,gamma,focal,avail,papal,golly,elite,versa,billy,adieu,annum,howdy,rhino,norms,bobby,axiom,setup,yolks,terns,mixer,genre,knoll,abode,junta,gorge,combo,alpha,overt,kinda,spelt,prick,nobly,ephod,audio,modal,veldt,warty,fluke,bonny,bream,rosin,bolls,doers,downs,beady,motif,humph,fella,mould,crepe,kerns,aloha,glyph,azure,riser,blest,locus,lumpy,beryl,wanna,brier,tuner,rowdy,mural,timer,canst,krill,quoth,lemme,triad,tenon,amply,deeps,padre,leant,pacer,octal,dolly,trans,sumac,foamy,lolly,giver,quipu,codex,manna,unwed,vodka,ferny,salon,duple,boron,revue,crier,alack,inter,dilly,whist,cults,spake,reset,loess,decor,mover,verve,ethic,gamut,lingo,dunno,align,sissy,incur,reedy,avant,piper,waxer,calyx,basil,coons,seine,piney,lemma,trams,winch,whirr,saith,ionic,heady,harem,tummy,sally,shied,dross,farad,saver,tilde,jingo,bower,serif,facto,belle,inset,bogus,caved,forte,sooty,bongo,toves,credo,basal,yella,aglow,glean,gusto,hymen,ethos,terra,brash,scrip,swash,aleph,tinny,itchy,wanta,trice,jowls,gongs,garde,boric,twill,sower,henry,awash,libel,spurn,sabre,rebut,penal,obese,sonny,quirt,mebbe,tacit,greek,xenon,hullo,pique,roger,negro,hadst,gecko,beget,uncut,aloes,louis,quint,clunk,raped,salvo,diode,matey,hertz,xylem,kiosk,apace,cawed,peter,wench,cohos,sorta,gamba,bytes,tango,nutty,axial,aleck,natal,clomp,gored,siree,bandy,gunny,runic,whizz,rupee,fated,wiper,bards,briny,staid,hocks,ochre,yummy,gents,soupy,roper,swath,cameo,edger,spate,gimme,ebbed,breve,theta,deems,dykes,servo,telly,tabby,tares,blocs,welch,ghoul,vitae,cumin,dinky,bronc,tabor,teeny,comer,borer,sired,privy,mammy,deary,gyros,sprit,conga,quire,thugs,furor,bloke,runes,bawdy,cadre,toxin,annul,egged,anion,nodes,picky,stein,jello,audit,echos,fagot,letup,eyrie,fount,caped,axons,amuck,banal,riled,petit,umber,miler,fibre,agave,bated,bilge,vitro,feint,pudgy,mater,manic,umped,pesky,strep,slurp,pylon,puree,caret,temps,newel,yawns,seedy,treed,coups,rangy,brads,mangy,loner,circa,tibia,afoul,mommy,titer,carne,kooky,motes,amity,suave,hippo,curvy,samba,newsy,anise,imams,tulle,aways,liven,hallo,wales,opted,canto,idyll,bodes,curio,wrack,hiker,chive,yokel,dotty,demur,cusps,specs,quads,laity,toner,decry,writs,saute,clack,aught,logos,tipsy,natty,ducal,bidet,bulgy,metre,lusts,unary,goeth,baler,sited,shies,hasps,brung,holed,swank,looky,melee,huffy,loamy,pimps,titan,binge,shunt,femur,libra,seder,honed,annas,coypu,shims,zowie,jihad,savvy,nadir,basso,monic,maned,mousy,omega,laver,prima,picas,folio,mecca,reals,troth,testy,balky,crimp,chink,abets,splat,abaci,vaunt,cutie,pasty,moray,levis,ratty,islet,joust,motet,viral,nukes,grads,comfy,voila,woozy,blued,whomp,sward,metro,skeet,chine,aerie,bowie,tubby,emirs,coati,unzip,slobs,trike,funky,ducat,dewey,skoal,wadis,oomph,taker,minim,getup,stoic,synod,runty,flyby,braze,inlay,venue,louts,peaty,orlon,humpy,radon,beaut,raspy,unfed,crick,nappy,vizor,yipes,rebus,divot,kiwis,vetch,squib,sitar,kiddo,dyers,cotta,matzo,lager,zebus,crass,dacha,kneed,dicta,fakir,knurl,runny,unpin,julep,globs,nudes,sushi,tacky,stoke,kaput,butch,hulas,croft,achoo,genii,nodal,outgo,spiel,viols,fetid,cagey,fudgy,epoxy,leggy,hanky,lapis,felon,beefy,coots,melba,caddy,segue,betel,frizz,drear,kooks,turbo,hoagy,moult,helix,zonal,arias,nosey,paean,lacey,banns,swain,fryer,retch,tenet,gigas,whiny,ogled,rumen,begot,cruse,abuts,riven,balks,sines,sigma,abase,ennui,gores,unset,augur,sated,odium,latin,dings,moire,scion,henna,kraut,dicks,lifer,prigs,bebop,gages,gazer,fanny,gibes,aural,tempi,hooch,rapes,snuck,harts,techs,emend,ninny,guava,scarp,liege,tufty,sepia,tomes,carob,emcee,prams,poser,verso,hubba,joule,baize,blips,scrim,cubby,clave,winos,rearm,liens,lumen,chump,nanny,trump,fichu,chomp,homos,purty,maser,woosh,patsy,shill,rusks,avast,swami,boded,ahhhh,lobed,natch,shish,tansy,snoot,payer,altho,sappy,laxer,hubby,aegis,riles,ditto,jazzy,dingo,quasi,septa,peaky,lorry,heerd,bitty,payee,seamy,apses,imbue,belie,chary,spoof,phyla,clime,babel,wacky,sumps,skids,khans,crypt,inure,nonce,outen,faire,hooey,anole,kazoo,calve,limbo,argot,ducky,faker,vibes,gassy,unlit,nervy,femme,biter,fiche,boors,gaffe,saxes,recap,synch,facie,dicey,ouija,hewer,legit,gurus,edify,tweak,caron,typos,rerun,polly,surds,hamza,nulls,hater,lefty,mogul,mafia,debug,pates,blabs,splay,talus,porno,moola,nixed,kilos,snide,horsy,gesso,jaggy,trove,nixes,creel,pater,iotas,cadge,skyed,hokum,furze,ankhs,curie,nutsy,hilum,remix,angst,burls,jimmy,veiny,tryst,codon,befog,gamed,flume,axman,doozy,lubes,rheas,bozos,butyl,kelly,mynah,jocks,donut,avian,wurst,chock,quash,quals,hayed,bombe,cushy,spacy,puked,leery,thews,prink,amens,tesla,intro,fiver,frump,capos,opine,coder,namer,jowly,pukes,haled,chard,duffs,bruin,reuse,whang,toons,frats,silty,telex,cutup,nisei,neato,decaf,softy,bimbo,adlib,loony,shoed,agues,peeve,noway,gamey,sarge,reran,epact,potty,coned,upend,narco,ikats,whorl,jinks,tizzy,weepy,posit,marge,vegan,clops,numbs,reeks,rubes,rower,biped,tiffs,hocus,hammy,bunco,fixit,tykes,chaws,yucky,hokey,resew,maven,adman,scuzz,slogs,souse,nacho,mimed,melds,boffo,debit,pinup,vagus,gulag,randy,bosun,educe,faxes,auras,pesto,antsy,betas,fizzy,dorky,snits,moxie,thane,mylar,nobby,gamin,gouty,esses,goyim,paned,druid,jades,rehab,gofer,tzars,octet,homed,socko,dorks,eared,anted,elide,fazes,oxbow,dowse,situs,macaw,scone,drily,hyper,salsa,mooch,gated,unjam,lipid,mitre,venal,knish,ritzy,divas,torus,mange,dimer,recut,meson,wined,fends,phage,fiats,caulk,cavil,panty,roans,bilks,hones,botch,estop,sully,sooth,gelds,ahold,raper,pager,fixer,infix,hicks,tuxes,plebe,twits,abash,twixt,wacko,primp,nabla,girts,miffs,emote,xerox,rebid,shahs,rutty,grout,grift,deify,biddy,kopek,semis,bries,acmes,piton,hussy,torts,disco,whore,boozy,gibed,vamps,amour,soppy,gonzo,durst,wader,tutus,perms,catty,glitz,brigs,nerds,barmy,gizmo,owlet,sayer,molls,shard,whops,comps,corer,colas,matte,droid,ploys,vapid,cairn,deism,mixup,yikes,prosy,raker,flubs,whish,reify,craps,shags,clone,hazed,macho,recto,refix,drams,biker,aquas,porky,doyen,exude,goofs,divvy,noels,jived,hulky,cager,harpy,oldie,vivas,admix,codas,zilch,deist,orcas,retro,pilaf,parse,rants,zingy,toddy,chiff,micro,veeps,girly,nexus,demos,bibbs,antes,lulus,gnarl,zippy,ivied,epees,wimps,tromp,grail,yoyos,poufs,hales,roust,cabal,rawer,pampa,mosey,kefir,burgs,unmet,cuspy,boobs,boons,hypes,dynes,nards,lanai,yogis,sepal,quark,toked,prate,ayins,hawed,swigs,vitas,toker,doper,bossa,linty,foist,mondo,stash,kayos,twerp,zesty,capon,wimpy,rewed,fungo,tarot,frosh,kabob,pinko,redid,mimeo,heist,tarps,lamas,sutra,dinar,whams,busty,spays,mambo,nabob,preps,odour,cabby,conks,sluff,dados,houri,swart,balms,gutsy,faxed,egads,pushy,retry,agora,drubs,daffy,chits,mufti,karma,lotto,toffs,burps,deuce,zings,kappa,clads,doggy,duper,scams,ogler,mimes,throe,zetas,waled,promo,blats,muffs,oinks,viand,coset,finks,faddy,minis,snafu,sauna,usury,muxes,craws,stats,condo,coxes,loopy,dorms,ascot,dippy,execs,dopey,envoi,umpty,gismo,fazed,strop,jives,slims,batik,pings,sonly,leggo,pekoe,prawn,luaus,campy,oodle,prexy,proms,touts,ogles,tweet,toady,naiad,hider,nuked,fatso,sluts,obits,narcs,tyros,delis,wooer,hyped,poset,byway,texas,scrod,avows,futon,torte,tuple,carom,kebab,tamps,jilts,duals,artsy,repro,modem,toped,psych,sicko,klutz,tarns,coxed,drays,cloys,anded,piker,aimer,suras,limos,flack,hapax,dutch,mucky,shire,klieg,staph,layup,tokes,axing,toper,duvet,cowry,profs,blahs,addle,sudsy,batty,coifs,suety,gabby,hafta,pitas,gouda,deice,taupe,topes,duchy,nitro,carny,limey,orals,hirer,taxer,roils,ruble,elate,dolor,wryer,snots,quais,coked,gimel,gorse,minas,goest,agape,manta,jings,iliac,admen,offen,cills,offal,lotta,bolas,thwap,alway,boggy,donna,locos,belay,gluey,bitsy,mimsy,hilar,outta,vroom,fetal,raths,renal,dyads,crocs,vires,culpa,kivas,feist,teats,thats,yawls,whens,abaca,ohhhh,aphis,fusty,eclat,perdu,mayst,exeat,molly,supra,wetly,plasm,buffa,semen,pukka,tagua,paras,stoat,secco,carte,haute,molal,shads,forma,ovoid,pions,modus,bueno,rheum,scurf,parer,ephah,doest,sprue,flams,molto,dieth,choos,miked,bronx,goopy,bally,plumy,moony,morts,yourn,bipod,spume,algal,ambit,mucho,spued,dozer,harum,groat,skint,laude,thrum,pappy,oncet,rimed,gigue,limed,plein,redly,humpf,lites,seest,grebe,absit,thanx,pshaw,yawps,plats,payed,areal,tilth,youse,gwine,thees,watsa,lento,spitz,yawed,gipsy,sprat,cornu,amahs,blowy,wahoo,lubra,mecum,whooo,coqui,sabra,edema,mrads,dicot,astro,kited,ouzel,didos,grata,bonne,axmen,klunk,summa,laves,purls,yawny,teary,masse,largo,bazar,pssst,sylph,lulab,toque,fugit,plunk,ortho,lucre,cooch,whipt,folky,tyres,wheee,corky,injun,solon,didot,kerfs,rayed,wassa,chile,begat,nippy,litre,magna,rebox,hydro,milch,brent,gyves,lazed,feued,mavis,inapt,baulk,casus,scrum,wised,fossa,dower,kyrie,bhoys,scuse,feuar,ohmic,juste,ukase,beaux,tusky,orate,musta,lardy,intra,quiff,epsom,neath,ocher,tared,homme,mezzo,corms,psoas,beaky,terry,infra,spivs,tuans,belli,bergs,anima,weirs,mahua,scops,manse,titre,curia,kebob,cycad,talky,fucks,tapis,amide,dolce,sloes,jakes,russe,blash,tutti,pruta,panga,blebs,tench,swarf,herem,missy,merse,pawky,limen,vivre,chert,unsee,tiros,brack,foots,welsh,fosse,knops,ileum,noire,firma,podgy,laird,thunk,shute,rowan,shoji,poesy,uncap,fames,glees,costa,turps,fores,solum,imago,byres,fondu,coney,polis,dictu,kraal,sherd,mumbo,wroth,chars,unbox,vacuo,slued,weest,hades,wiled,syncs,muser,excon,hoars,sibyl,passe,joeys,lotsa,lepta,shays,bocks,endue,darer,nones,ileus,plash,busby,wheal,buffo,yobbo,biles,poxes,rooty,licit,terce,bromo,hayey,dweeb,imbed,saran,bruit,punky,softs,biffs,loppy,agars,aquae,livre,biome,bunds,shews,diems,ginny,degum,polos,desex,unman,dungy,vitam,wedgy,glebe,apers,ridgy,roids,wifey,vapes,whoas,bunko,yolky,ulnas,reeky,bodge,brant,davit,deque,liker,jenny,tacts,fulls,treap,ligne,acked,refry,vower,aargh,churl,momma,gaols,whump,arras,marls,tiler,grogs,memes,midis,tided,haler,duces,twiny,poste,unrig,prise,drabs,quids,facer,spier,baric,geoid,remap,trier,gunks,steno,stoma,airer,ovate,torah,apian,smuts,pocks,yurts,exurb,defog,nuder,bosky,nimbi,mothy,joyed,labia,pards,jammy,bigly,faxer,hoppy,nurbs,cotes,dishy,vised,celeb,pismo,casas,withs,dodgy,scudi,mungs,muons,ureas,ioctl,unhip,krone,sager,verst,expat,gronk,uvula,shawm,bilgy,braes,cento,webby,lippy,gamic,lordy,mazed,tings,shoat,faery,wirer,diazo,carer,rater,greps,rente,zloty,viers,unapt,poops,fecal,kepis,taxon,eyers,wonts,spina,stoae,yenta,pooey,buret,japan,bedew,hafts,selfs,oared,herby,pryer,oakum,dinks,titty,sepoy,penes,fusee,winey,gimps,nihil,rille,giber,ousel,umiak,cuppy,hames,shits,azine,glads,tacet,bumph,coyer,honky,gamer,gooky,waspy,sedgy,bents,varia,djinn,junco,pubic,wilco,lazes,idyls,lupus,rives,snood,schmo,spazz,finis,noter,pavan,orbed,bates,pipet,baddy,goers,shako,stets,sebum,seeth,lobar,raver,ajuga,riced,velds,dribs,ville,dhows,unsew,halma,krona,limby,jiffs,treys,bauds,pffft,mimer,plebs,caner,jiber,cuppa,washy,chuff,unarm,yukky,styes,waker,flaks,maces,rimes,gimpy,guano,liras,kapok,scuds,bwana,oring,aider,prier,klugy,monte,golem,velar,firer,pieta,umbel,campo,unpeg,fovea,abeam,boson,asker,goths,vocab,vined,trows,tikis,loper,indie,boffs,spang,grapy,tater,ichor,kilty,lochs,supes,degas,flics,torsi,beths,weber,resaw,lawny,coven,mujik,relet,therm,heigh,shnor,trued,zayin,liest,barfs,bassi,qophs,roily,flabs,punny,okras,hanks,dipso,nerfs,fauns,calla,pseud,lurer,magus,obeah,atria,twink,palmy,pocky,pends,recta,plonk,slaws,keens,nicad,pones,inker,whews,groks,mosts,trews,ulnar,gyppy,cocas,expos,eruct,oiler,vacua,dreck,dater,arums,tubal,voxel,dixit,beery,assai,lades,actin,ghoti,buzzy,meads,grody,ribby,clews,creme,email,pyxie,kulak,bocci,rived,duddy,hoper,lapin,wonks,petri,phial,fugal,holon,boomy,duomo,musos,shier,hayer,porgy,hived,litho,fisty,stagy,luvya,maria,smogs,asana,yogic,slomo,fawny,amine,wefts,gonad,twirp,brava,plyer,fermi,loges,niter,revet,unate,gyved,totty,zappy,honer,giros,dicer,calks,luxes,monad,cruft,quoin,fumer,amped,shlep,vinca,yahoo,vulva,zooey,dryad,nixie,moper,iambs,lunes,nudie,limns,weals,nohow,miaow,gouts,mynas,mazer,kikes,oxeye,stoup,jujus,debar,pubes,taels,defun,rands,blear,paver,goosy,sprog,oleos,toffy,pawer,maced,crits,kluge,tubed,sahib,ganef,scats,sputa,vaned,acned,taxol,plink,oweth,tribs,resay,boule,thous,haply,glans,maxis,bezel,antis,porks,quoit,alkyd,glary,beamy,hexad,bonks,tecum,kerbs,filar,frier,redux,abuzz,fader,shoer,couth,trues,guyed,goony,booky,fuzes,hurly,genet,hodad,calix,filer,pawls,iodic,utero,henge,unsay,liers,piing,weald,sexed,folic,poxed,cunts,anile,kiths,becks,tatty,plena,rebar,abled,toyer,attar,teaks,aioli,awing,anent,feces,redip,wists,prats,mesne,muter,smurf,owest,bahts,lossy,ftped,hunky,hoers,slier,sicks,fatly,delft,hiver,himbo,pengo,busks,loxes,zonks,ilium,aport,ikons,mulct,reeve,civvy,canna,barfy,kaiak,scudo,knout,gaper,bhang,pease,uteri,lases,paten,rasae,axels,stoas,ombre,styli,gunky,hazer,kenaf,ahoys,ammos,weeny,urger,kudzu,paren,bolos,fetor,nitty,techy,lieth,somas,darky,villi,gluon,janes,cants,farts,socle,jinns,ruing,slily,ricer,hadda,wowee,rices,nerts,cauls,swive,lilty,micks,arity,pasha,finif,oinky,gutty,tetra,wises,wolds,balds,picot,whats,shiki,bungs,snarf,legos,dungs,stogy,berms,tangs,vails,roods,morel,sware,elans,latus,gules,razer,doxie,buena,overs,gutta,zincs,nates,kirks,tikes,donee,jerry,mohel,ceder,doges,unmap,folia,rawly,snark,topoi,ceils,immix,yores,diest,bubba,pomps,forky,turdy,lawzy,poohs,worts,gloms,beano,muley,barky,tunny,auric,funks,gaffs,cordy,curdy,lisle,toric,soyas,reman,mungy,carpy,apish,oaten,gappy,aurae,bract,rooky,axled,burry,sizer,proem,turfy,impro,mashy,miens,nonny,olios,grook,sates,agley,corgi,dashy,doser,dildo,apsos,xored,laker,playa,selah,malty,dulse,frigs,demit,whoso,rials,sawer,spics,bedim,snugs,fanin,azoic,icers,suers,wizen,koine,topos,shirr,rifer,feral,laded,lased,turds,swede,easts,cozen,unhit,pally,aitch,sedum,coper,ruche,geeks,swags,etext,algin,offed,ninja,holer,doter,toter,besot,dicut,macer,peens,pewit,redox,poler,yecch,fluky,doeth,twats,cruds,bebug,bider,stele,hexer,wests,gluer,pilau,abaft,whelm,lacer,inode,tabus,gator,cuing,refly,luted,cukes,bairn,bight,arses,crump,loggy,blini,spoor,toyon,harks,wazoo,fenny,naves,keyer,tufas,morph,rajas,typal,spiff,oxlip,unban,mussy,finny,rimer,login,molas,cirri,huzza,agone,unsex,unwon,peats,toile,zombi,dewed,nooky,alkyl,ixnay,dovey,holey,cuber,amyls,podia,chino,apnea,prims,lycra,johns,primo,fatwa,egger,hempy,snook,hying,fuzed,barms,crink,moots,yerba,rhumb,unarc,direr,munge,eland,nares,wrier,noddy,atilt,jukes,ender,thens,unfix,doggo,zooks,diddy,shmoo,brusk,prest,curer,pasts,kelpy,bocce,kicky,taros,lings,dicky,nerdy,abend,stela,biggy,laved,baldy,pubis,gooks,wonky,stied,hypos,assed,spumy,osier,roble,rumba,biffy,pupal');
var $author$project$Words$french = A2($elm$core$String$split, ',', 'abats,abbes,abces,abeti,abima,abime,aboie,abois,aboli,abord,abots,about,aboya,aboye,abris,abusa,abuse,acces,accot,accru,accus,acera,acere,achat,acide,acier,acini,acmes,acnes,acons,acore,acres,actai,actas,actat,actee,acter,actes,actez,actif,adage,adent,adieu,admet,admis,admit,adnee,adnes,adora,adore,adret,adula,adule,aedes,aequo,aerai,aeras,aerat,aeree,aerer,aeres,aerez,affin,affut,agaca,agace,agami,agape,agate,agave,agees,agent,aghas,agile,agios,agira,agita,agite,agnat,agora,agrea,agree,agres,aguis,ahana,ahane,ahans,ahuri,aiche,aidai,aidas,aidat,aidee,aider,aides,aidez,aient,aieul,aieux,aigle,aigre,aigri,aigue,aigus,ailee,ailes,ailla,aille,aimai,aimas,aimat,aimee,aimer,aimes,aimez,ainee,aines,ainsi,aioli,airai,airas,airat,airer,aires,airez,aisee,aises,aisys,ajonc,ajour,ajout,album,aldin,aldol,aleas,alene,aleph,alesa,alese,alfas,algie,algol,algue,alias,alibi,alios,alise,alita,alite,alize,allai,allas,allat,allee,aller,alles,allez,allia,allie,almee,aloes,alors,alose,alpax,alpes,alpha,alpin,altos,aluna,alune,aluni,aluns,alvin,alyte,amant,amati,ambla,amble,ambon,ambra,ambre,amena,amene,amere,amers,amibe,amict,amide,amies,amine,amont,amour,amphi,ample,ampli,amuie,amuis,amura,amure,amusa,amuse,amyle,anale,anaux,anche,ancra,ancre,andin,aneth,anges,angle,angon,angor,anier,anima,anime,anion,anisa,anise,annal,annee,anode,anons,ansee,anses,antan,antes,antre,aorte,aouta,aoute,aphte,apiol,apion,aplat,apnee,apode,appas,appat,appel,appui,apres,aptes,apura,apure,arabe,arasa,arase,arbre,arche,arcon,ardue,ardus,arecs,arene,arete,argas,argon,argot,argua,argue,argus,arias,aride,arien,arisa,arise,armai,armas,armat,armee,armer,armes,armet,armez,armon,arome,arqua,arque,arret,arsin,artel,arums,aryen,aryle,asile,aspes,aspic,asque,assai,asses,assez,assis,assit,aster,astis,astre,atele,athee,atlas,atoll,atome,atone,atour,atout,aubes,aubin,aucun,audio,audit,auges,auget,aulne,aunes,aurai,auras,aurez,aussi,autel,autos,autre,avais,avait,avala,avale,avals,avant,avare,avens,avenu,avera,avere,avers,aveux,avide,aviez,avili,avina,avine,avion,avisa,avise,aviso,aviva,avive,avoir,avons,avoua,avoue,avril,axais,axait,axant,axees,axent,axera,axiez,axile,axone,axons,ayant,ayons,azote,azura,azure,azurs,azyme,babas,babil,babys,bacha,bache,bacla,bacle,bacon,bacul,badge,badin,baffa,baffe,bafra,bafre,bagad,bagne,bagou,bagua,bague,bahut,baies,bains,baisa,baise,balai,bales,balla,balle,balsa,balte,banal,banco,bancs,banda,bande,bangs,banjo,banna,banne,banni,barba,barbe,barbu,barda,barde,bards,barge,baril,barns,baron,barra,barre,barri,barye,basai,basal,basas,basat,basee,baser,bases,basez,basic,basin,basse,baste,batai,batas,batat,batee,bater,bates,batez,batie,batik,batir,batis,batit,baton,batte,battu,bauds,bauge,baume,bavai,bavas,bavat,baver,baves,bavez,bayai,bayas,bayat,bayer,bayes,bayez,bayou,bazar,beais,beait,beant,beate,beats,beauf,beaux,bebes,becha,beche,becot,becta,becte,bedon,beent,beera,begue,begum,beiez,beige,bekes,belai,belas,belat,belee,beler,beles,belez,belge,belle,belon,bemol,benef,benet,benie,benin,benir,benis,benit,benne,beons,bequa,beque,berca,berce,beret,berge,berme,berna,berne,beryl,besef,betas,betel,betes,beton,bette,beurs,bevue,biais,bibis,bible,bicha,biche,bicot,bides,bidet,bidon,biefs,biens,biere,biffa,biffe,bigla,bigle,bigot,bigre,bigue,bijou,bilai,bilan,bilas,bilat,bilee,biler,biles,bilez,bille,bills,binai,binas,binat,binee,biner,bines,binez,bingo,bique,birbe,bisai,bisas,bisat,bisee,biser,bises,biset,bisez,bison,bisou,bissa,bisse,bitai,bitas,bitat,bitee,biter,bites,bitez,bitos,bitta,bitte,bizut,black,blair,blama,blame,blanc,blaps,blasa,blase,bleds,bleme,blemi,blesa,blese,blets,bleue,bleui,bleus,blocs,blond,blues,bluet,bluff,bluta,blute,bobos,bocal,boche,bocks,boete,boeuf,bogie,bogue,boira,boire,boisa,boise,boita,boite,boive,boldo,bolee,bolet,bomba,bombe,bomes,bonda,bonde,bondi,bonds,bonis,bonne,bonte,bonus,bonze,booms,boots,boras,borax,borda,borde,bords,bores,borna,borne,borts,bosco,bossa,bosse,bossu,botes,botta,botte,boucs,bouda,boude,bouee,boues,bouge,bouif,boula,boule,boume,bourg,bouse,bouta,boute,bouts,bovin,boxai,boxas,boxat,boxee,boxer,boxes,boxez,boyau,brada,brade,braie,brais,brait,brama,brame,brans,brasa,brase,brava,brave,bravo,braya,braye,break,brefs,brela,brele,breme,breve,brick,brida,bride,bries,brifa,brife,brima,brime,brins,brios,brisa,brise,brocs,broda,brode,broie,brome,brook,broum,brous,brout,broya,broye,bruie,bruir,bruis,bruit,brula,brule,bruma,brume,brune,bruni,bruns,brute,bruts,bubon,bucha,buche,buees,buggy,bugle,buire,bulbe,bulle,bumes,bures,burin,buron,buscs,buses,busse,buste,butai,butas,butat,butee,buter,butes,butez,butin,butor,butta,butte,buvee,buvez,caban,cabas,cabla,cable,cabot,cabra,cabre,cabri,cabus,cacao,cacas,cacha,cache,caddy,cades,cadet,cadis,cadra,cadre,caduc,cafes,cafre,cafta,cafte,cages,caget,cagna,cagne,cagot,cahot,caids,caieu,cairn,cajou,cajun,cakes,calai,calao,calas,calat,calee,caler,cales,calez,calfs,calin,calma,calme,calmi,calos,calot,calta,calte,calva,camee,cames,campa,campe,camps,camus,canai,canal,canas,canat,candi,caner,canes,canez,canif,canin,canna,canne,canoe,canon,canot,canut,caoua,capea,capee,capes,capon,capot,cappa,capre,capta,capte,caqua,caque,carat,carda,carde,carex,cargo,caria,carie,caris,carma,carme,carne,carpe,carra,carre,carry,carte,casai,casas,casat,casee,caser,cases,casez,cassa,casse,caste,catch,catin,catis,cauri,causa,cause,cavai,cavas,cavat,cavee,caver,caves,cavet,cavez,ceans,cedai,cedas,cedat,cedee,ceder,cedes,cedex,cedez,cedre,ceins,ceint,celai,celas,celat,celee,celer,celes,celez,cella,celle,celte,celui,cenes,cense,cents,cepes,cerat,cerce,cerfs,cerna,cerne,cesar,cessa,cesse,ceste,cette,chahs,chair,chais,chale,champ,chant,chaos,chape,chars,chats,chaud,chaut,chaux,chefs,cheik,chene,chenu,chera,chere,cheri,chers,chiai,chias,chiat,chics,chiee,chien,chier,chies,chiez,china,chine,chiot,chipa,chipe,chips,chocs,choie,choir,chois,choit,choix,choma,chome,chopa,chope,chose,chott,choux,choya,choye,chues,chuta,chute,chyle,chyme,cible,cidre,ciels,cieux,cigue,cilie,cilla,cille,cimes,cines,cippe,cirai,ciras,cirat,ciree,cirer,cires,cirez,ciron,cirre,ciste,citai,citas,citat,citee,citer,cites,citez,civet,civil,clade,claie,clair,clama,clame,clamp,clams,clans,clapa,clape,clapi,clava,clave,clebs,clefs,clerc,clics,clins,clips,cliva,clive,clodo,clone,clope,clora,clore,close,cloua,cloue,clous,clown,clubs,cluse,coach,coati,cobea,cobol,cobra,cocas,cocha,coche,cocon,cocos,cocus,codai,codas,codat,codee,coder,codes,codex,codez,codon,coeur,cogna,cogne,cohue,coing,coins,coita,coite,coits,colin,colis,colla,colle,colon,colts,colza,comas,combe,comma,comme,comte,concu,conde,cones,conga,conge,conie,conir,conis,conit,connu,conta,conte,copal,copia,copie,copra,copte,coqua,coque,coran,corda,corde,corna,corne,cornu,coron,corps,corsa,corse,cossa,cosse,cossu,cosys,cotai,cotas,cotat,cotee,coter,cotes,cotez,cotie,cotir,cotis,cotit,coton,cotte,couac,couda,coude,couds,couic,coula,coule,coupa,coupe,coups,coure,cours,court,couru,couse,cousu,couta,coute,couts,couva,couve,coxal,coyau,crabe,crack,crado,craie,crama,crame,crana,crane,crans,crase,crash,crave,crawl,creai,creas,creat,credo,creee,creer,crees,creez,crema,creme,crena,crene,crepa,crepe,crepi,crepu,crete,creux,creva,creve,criai,crias,criat,crics,criee,crier,cries,criez,crime,crins,crise,crocs,croie,crois,croit,croix,cross,cruel,crues,cubai,cubas,cubat,cubee,cuber,cubes,cubez,cuira,cuire,cuirs,cuise,cuita,cuite,cuits,culai,culas,culat,culee,culer,cules,culex,culez,culot,culte,cumin,cumul,curai,curas,curat,curee,curer,cures,curez,curry,cuvai,cuvas,cuvat,cuvee,cuver,cuves,cuvez,cyans,cycas,cycle,cygne,czars,dadas,dagua,dague,dahir,daims,daine,dalla,dalle,dalot,damai,daman,damas,damat,damee,damer,dames,damez,damna,damne,dandy,dansa,danse,darce,darda,darde,dards,darne,darse,datai,datas,datat,datee,dater,dates,datez,datif,datte,dauba,daube,debat,debet,debit,debut,decan,decas,deces,deche,dechu,decis,decor,decri,decru,decue,decus,decut,dedia,dedie,dedis,dedit,defia,defie,defis,defit,degat,degel,degre,deite,delai,delco,delia,delie,delit,delot,delta,demes,demet,demie,demis,demit,demon,denia,denie,denis,dense,dente,dents,denua,denue,depit,deplu,depot,derby,derme,derny,desir,dette,deuil,devet,devez,devia,devie,devin,devis,devot,devra,diane,diapo,dicos,dicta,dicte,diese,diete,dieux,diffa,digit,digne,digon,digue,dilua,dilue,dimes,dinai,dinar,dinas,dinat,dinde,diner,dines,dinez,dingo,diode,dirai,diras,direz,disco,dises,disse,dites,divan,divas,divin,divis,djain,djinn,docks,docte,dodos,dodue,dodus,doges,dogme,dogue,doigt,doive,dolai,dolas,dolat,dolce,dolee,doler,doles,dolez,dolic,domes,donna,donne,dopai,dopas,dopat,dopee,doper,dopes,dopez,dorai,doras,dorat,doree,dorer,dores,dorez,doris,dorme,dormi,dosai,dosas,dosat,dosee,doser,doses,dosez,dosse,dotai,dotal,dotas,dotat,dotee,doter,dotes,dotez,douai,douar,douas,douat,douce,douci,douee,douer,doues,douez,doums,douro,douta,doute,douve,douze,doyen,draie,drain,drame,drapa,drape,draps,drave,draya,draye,drege,drill,dring,drink,driva,drive,droit,drole,dropa,drope,drops,drues,drupe,duale,duaux,ducal,ducat,duces,duche,duels,duite,duits,dulie,dumes,dunes,duodi,dupai,dupas,dupat,dupee,duper,dupes,dupez,durai,duras,durat,durci,duree,durer,dures,durez,durit,dusse,dutes,duvet,dyade,dzeta,ebahi,ebats,ebene,eboua,eboue,ecala,ecale,ecang,ecart,ecati,echec,eches,echos,echue,echus,echut,ecima,ecime,eclat,eclos,eclot,ecole,ecopa,ecope,ecora,ecore,ecote,ecots,ecran,ecrie,ecrin,ecris,ecrit,ecrou,ecrue,ecrus,ecula,ecule,ecuma,ecume,ecura,ecure,edams,edens,edile,edita,edite,edits,effet,egaie,egala,egale,egara,egard,egare,egaux,egaya,egaye,egeen,egide,egout,eider,elans,elave,elbot,elegi,eleis,eleva,eleve,elfes,elida,elide,elima,elime,elira,elire,elise,elite,elles,eloge,eluda,elude,elues,email,emana,emane,emaux,embat,embua,embue,embus,emeri,emets,emeus,emeut,emiai,emias,emiat,emiee,emier,emies,emiez,emirs,emise,emois,emoud,emous,empan,empli,emues,emula,emule,encan,encas,encra,encre,endos,enfer,enfeu,enfin,enfla,enfle,enfui,engin,enjeu,enlia,enlie,ennui,enoua,enoue,entai,entas,entat,entee,enter,entes,entez,entra,entre,envia,envie,envoi,envol,epair,epais,epala,epale,epand,epars,epata,epate,epave,epees,epela,epele,ephod,epiai,epias,epiat,epica,epice,epiee,epier,epies,epieu,epiez,epige,epila,epile,epina,epine,epite,epode,epoux,epris,epuca,epuce,epura,epure,equin,eraie,eraya,eraye,ergot,erige,erine,eroda,erode,errai,erras,errat,errer,erres,errez,escha,esche,escot,espar,essai,esses,essor,ester,estoc,etage,etaie,etain,etais,etait,etala,etale,etals,etama,etame,etang,etant,etape,etats,etaux,etaya,etaye,etend,eteta,etete,eteuf,ether,etier,etiez,etira,etire,etocs,etole,etres,etron,etude,etuis,etuva,etuve,eumes,euros,eusse,eutes,evade,evasa,evase,eveil,event,evida,evide,evier,evita,evite,evohe,exact,exces,exclu,exige,exigu,exila,exile,exils,exode,expia,expie,extra,fable,faces,facha,fache,facho,facon,facto,fadai,fadas,fadat,fadee,fader,fades,fadez,fados,fagne,fagot,faims,faine,faire,faite,faits,fakir,fallu,falot,falun,famee,fames,fanai,fanal,fanas,fanat,fanee,faner,fanes,fanez,fange,fanon,faons,farad,farce,farci,farda,farde,fards,faros,farta,farte,farts,fasce,fasse,faste,fatal,fatma,fatum,faune,fauta,faute,fauve,favus,faxai,faxas,faxat,faxee,faxer,faxes,faxez,fayot,feale,feaux,fecal,feces,feins,feint,felai,felas,felat,felee,feler,feles,felez,felin,felon,femme,femur,fende,fends,fendu,fenil,fente,ferai,feras,ferez,ferie,ferla,ferle,ferma,ferme,ferra,ferre,ferry,ferue,ferus,fessa,fesse,fessu,fetai,fetas,fetat,fetee,feter,fetes,fetez,fetus,feues,feuil,feula,feule,feves,fiais,fiait,fiant,fibre,ficha,fiche,fichu,ficus,fiees,fiefs,fiels,fient,fiera,fiere,fiers,fieux,fifre,figea,figee,figer,figes,figez,figue,fiiez,filai,filas,filat,filee,filer,files,filet,filez,filin,fille,filma,filme,films,filon,filou,fimes,final,fines,finie,finir,finis,finit,fiole,fions,firme,fiscs,fisse,fites,fixai,fixas,fixat,fixee,fixer,fixes,fixez,fjeld,fjord,flair,flana,flanc,flane,flans,flapi,flash,fleau,flein,fleur,flics,flint,flirt,flood,flops,flore,flots,floua,floue,flous,fluai,fluas,fluat,fluer,flues,fluet,fluez,fluor,flush,fluta,flute,fluxa,fluxe,focal,foehn,foies,foins,foira,foire,folie,folio,folks,folle,fonca,fonce,fonda,fonde,fonds,fondu,fonte,foots,forai,foras,forat,forca,force,forci,foree,forer,fores,foret,forez,forge,forma,forme,forte,forts,forum,fosse,fouee,fouet,fouge,fouie,fouir,fouis,fouit,foula,foule,fours,foute,foutu,fovea,foxee,foxes,foyer,fracs,fraie,frais,franc,frape,fraya,fraye,frein,frele,fremi,frene,freon,frere,freta,frete,frets,freux,frics,frigo,frima,frime,fripa,fripe,frira,frire,frisa,frise,frite,fritz,frocs,froid,frola,frole,front,froua,froue,fruit,fucus,fuels,fugua,fugue,fuies,fuira,fuite,fulls,fumai,fumas,fumat,fumee,fumer,fumes,fumet,fumez,funin,funky,furax,furet,furia,furie,fusai,fusas,fusat,fusee,fusel,fuser,fuses,fusez,fusil,fusse,futee,futes,futur,fuyez,gable,gacha,gache,gades,gadin,gaffa,gaffe,gagas,gagea,gagee,gager,gages,gagez,gagna,gagne,gaiac,gaies,gaina,gaine,gains,galas,galba,galbe,gales,galet,gallo,galon,galop,gamba,gambe,gamin,gamme,ganga,gangs,gansa,ganse,ganta,gante,gants,garai,garas,garat,garce,garda,garde,garee,garer,gares,garez,garni,garou,gatai,gatas,gatat,gatee,gater,gates,gatez,gatte,gaude,gaula,gaule,gaupe,gaurs,gauss,gavai,gavas,gavat,gavee,gaver,gaves,gavez,gayal,gazai,gazas,gazat,gazee,gazer,gazes,gazez,gazon,geais,geant,gecko,geins,geint,gelai,gelas,gelat,gelee,geler,geles,gelez,gelif,gemie,gemir,gemis,gemit,gemma,gemme,genai,genas,genat,genee,gener,genes,genet,genez,genie,genou,genre,geode,geole,gerai,geras,gerat,gerba,gerbe,gerca,gerce,geree,gerer,geres,gerez,germa,germe,gesir,gesse,geste,gibet,gibus,gicla,gicle,gifla,gifle,gigot,gigue,gilde,gilet,gille,girie,girls,giron,gisez,gitai,gitan,gitas,gitat,giter,gites,gitez,giton,givra,givre,glaca,glace,glana,gland,glane,glapi,glass,glati,glebe,glene,globe,glome,glosa,glose,gluau,gluis,glume,gnole,gnome,gnons,gnose,gnous,goals,gobai,gobas,gobat,gobee,gober,gobes,gobez,gobie,godai,godas,godat,goder,godes,godet,godez,goglu,gogos,golfe,golfs,gombo,gomma,gomme,gonda,gonde,gonds,gongs,gonze,gords,goret,gorge,gosse,goton,gouda,gouet,gouge,goule,goulu,goums,goura,gourd,goure,gouta,goute,gouts,goyim,grace,grade,grain,grand,graux,grava,grave,gravi,greai,greas,great,grebe,grecs,greee,green,greer,grees,greez,grege,grela,grele,grena,grene,grenu,gresa,grese,greva,greve,grief,grill,grils,grima,grime,griot,grisa,grise,grive,grogs,groin,grole,groom,group,gruau,grues,gruge,grume,guais,guano,gueai,gueas,gueat,guede,gueee,gueer,guees,gueez,guepe,guere,gueri,guete,guets,gueux,guida,guide,guipa,guipe,guise,guppy,gurus,guzla,gypse,gyrin,habit,habla,hable,hacha,hache,hadji,haies,haiks,haiku,haine,haira,haire,halai,halas,halat,halbi,halee,haler,hales,halez,halle,halls,halos,halte,halva,hamac,hampe,hanap,hanse,hanta,hante,hapax,happa,happe,haras,harda,harde,hardi,harem,harki,harle,haros,harpa,harpe,harts,hasch,hases,haste,hasts,hatai,hatas,hatat,hatee,hater,hates,hatez,hatif,haute,hauts,havai,havas,havat,havee,haver,haves,havez,havie,havir,havis,havit,havre,hayon,hecto,helai,helas,helat,helee,heler,heles,helez,helix,hello,henne,henni,henry,herba,herbe,herbu,heres,heron,heros,herpe,hersa,herse,hertz,hetre,heure,heurs,heurt,hevea,hibou,hindi,hippy,hissa,hisse,hiver,hobby,hocco,hocha,hoche,hoirs,homes,homme,homos,honni,honte,horde,horst,hosto,hotel,hotes,hotte,houai,houas,houat,houee,houer,houes,houez,houka,houle,hourd,houri,hoyau,huais,huait,huant,huard,huart,hucha,huche,huees,huent,huera,huiez,huila,huile,humai,humas,humat,humee,humer,humes,humez,humus,hunes,huons,huppe,hures,hurla,hurle,huron,hutte,hydne,hydre,hyene,hymen,hymne,iambe,ibere,ichor,icone,ictus,ideal,ideel,idees,idiot,idole,igloo,ignee,ignes,igues,ileal,ileon,ileus,ilien,ilion,ilote,ilots,image,imago,imams,imbue,imbus,imide,imita,imite,immun,imper,impie,impot,impur,incas,index,indue,indus,infra,infus,inlay,innee,innes,inoui,input,inter,intis,inuit,inule,iodai,iodas,iodat,iodee,ioder,iodes,iodez,iodla,iodle,ioula,ioule,ipeca,irais,irait,iriez,irisa,irise,irone,irons,iront,isard,isbas,islam,isola,isole,issue,issus,items,itera,itere,iules,ivres,ixias,ixode,jabla,jable,jabot,jacee,jacks,jacot,jacta,jacte,jades,jadis,jaina,jains,jalap,jales,jalon,jambe,jante,japon,jappa,jappe,jarde,jarre,jasai,jasas,jasat,jaser,jases,jasez,jaspa,jaspe,jatte,jauge,jaune,jauni,javas,javel,jeans,jeeps,jenny,jerez,jerka,jerke,jerks,jesus,jetai,jetas,jetat,jetee,jeter,jetes,jetez,jeton,jette,jeudi,jeuna,jeune,jodla,jodle,joies,joins,joint,joker,jolie,jolis,jonca,jonce,joncs,jotas,jouai,joual,jouas,jouat,jouee,jouer,joues,jouet,jouez,jougs,jouir,jouis,jouit,joule,jours,jouta,joute,joyau,jubes,jucha,juche,judas,judos,jugal,jugea,jugee,juger,juges,jugez,juifs,juill,juive,julep,jules,jumbo,jumel,junte,jupes,jupon,jurai,juras,jurat,juree,jurer,jures,jurez,juron,jurys,jusee,jusqu,juste,jutai,jutas,jutat,jutee,juter,jutes,jutez,kacha,kache,kakis,kalis,kamis,kapok,kappa,karma,karts,kavas,kawas,kayac,kayak,kefir,kendo,kepis,ketch,khans,khats,khmer,khols,kicks,kiefs,kikis,kilos,kilts,kiwis,knout,koala,koine,kolas,kores,kraal,krach,kraft,kraks,kriss,ksour,kurde,kyrie,kyste,label,labie,labre,lacai,lacas,lacat,lacee,lacer,laces,lacet,lacez,lacha,lache,lacis,lacte,ladin,ladre,lagon,laics,laide,laids,laies,laina,laine,laird,laite,laits,laius,laize,lamai,lamas,lamat,lamee,lamer,lames,lamez,lamie,lampa,lampe,lanca,lance,lande,lange,lapai,lapas,lapat,lapee,laper,lapes,lapez,lapin,lapis,laqua,laque,larda,larde,lards,large,largo,larme,larve,laser,lassa,lasse,lasso,latex,latin,latta,latte,laure,lavai,lavas,lavat,lavee,laver,laves,lavez,lavis,layai,layas,layat,layee,layer,layes,layez,layon,lazzi,lebel,lecha,leche,lecon,ledit,legal,legat,leger,leges,legua,legue,lemme,lente,lento,lents,lepre,lerot,lesai,lesas,lesat,lesee,leser,leses,lesez,lesta,leste,lests,letal,leude,leurs,levai,levas,levat,levee,lever,leves,levez,levre,lexie,lexis,liage,liais,liait,liane,liant,liard,liber,libre,lices,licha,liche,licol,licou,lidos,lieds,liees,liege,liens,lient,liera,lieue,lieur,lieus,lieux,lifta,lifte,lifts,liges,ligie,ligna,ligne,ligot,ligua,ligue,liiez,lilas,limai,liman,limas,limat,limbe,limee,limer,limes,limez,limon,liner,linga,linge,links,linon,linos,lions,lippe,lippu,lirai,liras,lirez,liron,lises,lisez,lissa,lisse,lista,liste,litai,litas,litat,litee,liter,lites,litez,litho,litre,liure,lives,livet,livra,livre,lobai,lobas,lobat,lobby,lobee,lober,lobes,lobez,local,locha,loche,lochs,loden,loess,lofai,lofas,lofat,lofer,lofes,lofez,lofts,logea,logee,loger,loges,logez,logis,logos,loirs,lolos,longe,longs,looch,loofa,looks,lopin,loqua,loque,loran,lords,loris,lotes,lotie,lotir,lotis,lotit,lotos,lotte,lotus,louai,louas,louat,louee,louer,loues,louez,loufa,loufe,louis,loupa,loupe,loups,loura,lourd,loure,louva,louve,lovai,lovas,lovat,lovee,lover,loves,lovez,loyal,loyer,lubie,lucre,lueur,luffa,lugea,luger,luges,lugez,luira,luire,luise,luite,luits,lulus,lumen,lumes,lumps,lunch,lundi,lunee,lunes,lupin,lupus,luron,lusin,lusse,lutai,lutas,lutat,lutee,luter,lutes,lutez,luths,lutin,lutta,lutte,luxai,luxas,luxat,luxee,luxer,luxes,luxez,lycee,lycra,lyres,lyric,lysai,lysas,lysat,lysee,lyser,lyses,lysez,macha,mache,macho,macis,macla,macle,macon,macre,madre,mafia,mages,magie,magma,magna,magne,magot,maias,maies,mails,mains,maint,maire,major,makis,males,malin,malis,malle,malta,malte,malts,malus,maman,mambo,mamie,mammy,manas,manda,mande,manes,mange,mania,manie,manne,manse,mante,maori,maoux,maqua,maque,marcs,mardi,maree,mares,marge,maria,marie,marin,maris,marks,marli,marna,marne,marra,marre,marri,marte,maser,massa,masse,mataf,matai,matas,matat,match,matee,mater,mates,matez,maths,matie,matin,matir,matis,matit,maton,matou,matte,maure,mauve,mayas,mayen,mayes,meats,mecha,meche,medes,media,medis,medit,medoc,mefia,mefie,mefis,mefit,megie,megir,megis,megit,megot,meiji,melai,melas,melat,melba,melee,meler,meles,melez,melia,melon,melos,memes,menai,menas,menat,menee,mener,menes,menez,menin,mense,mente,menti,menue,menus,merci,merde,meres,merle,merlu,merou,mesas,messe,metal,metas,meteo,metis,metra,metre,metro,mette,meula,meule,meure,meurs,meurt,meute,meuve,mezzo,miaou,micas,miche,micro,midis,miels,miens,mieux,migra,migre,milan,miles,mille,mimai,mimas,mimat,mimee,mimer,mimes,mimez,mimis,minai,minas,minat,mince,minci,minee,miner,mines,minet,minez,minis,minot,minou,minus,mirai,miras,mirat,miree,mirer,mires,mirez,miros,misai,misas,misat,misee,miser,mises,misez,misse,mitai,mitan,mitas,mitat,mitee,miter,mites,mitez,miton,mitre,mixai,mixas,mixat,mixee,mixer,mixes,mixez,mixte,moche,mocos,modal,modem,modes,modus,moere,moine,moins,moira,moire,moisa,moise,moisi,moita,moite,moiti,mokas,moles,molle,molli,mollo,molys,momes,momie,monda,monde,monel,monos,monta,monte,monts,moqua,moque,moral,morde,mords,mordu,mores,morio,morne,morse,morte,morts,morue,morve,mosan,motel,motet,motif,motos,motta,motte,motus,mouds,moues,moula,moule,moult,moulu,mouts,mouva,mouve,moxas,moyee,moyen,moyes,moyeu,muais,muait,muant,mucha,muche,mucor,mucus,muees,muent,muera,muets,mufle,mufti,muges,mugir,mugis,mugit,muids,muiez,mules,mulet,mulon,mulot,mumes,munie,munir,munis,munit,muons,murai,mural,muras,murat,muree,murer,mures,muret,murex,murez,murie,murir,muris,murit,musai,musas,musat,muscs,musee,muser,muses,musez,mussa,musse,musts,mutai,mutas,mutat,mutee,muter,mutes,mutez,mutin,myome,myope,myrte,mythe,nabab,nabot,nacra,nacre,nadir,nafes,nagea,nagee,nager,nages,nagez,naifs,naine,nains,naive,najas,nanan,nanar,nanas,nanti,napee,napel,nappa,nappe,nards,narra,narre,nasal,nases,nasse,natal,natif,natta,natte,naval,navet,navra,navre,nazie,nazis,neant,nebka,necks,nefle,negre,negus,neige,nenes,nenni,neons,nerfs,nervi,nette,neufs,neume,neuve,neves,neveu,niais,niait,niant,nicha,niche,nicol,niece,niees,nieme,nient,niera,nifes,niiez,nille,nimba,nimbe,ninas,niole,nions,nippa,nippe,nique,nitra,nitre,nival,nixes,noble,noces,nocif,noels,noeud,noies,noire,noirs,noise,nolis,nomes,nomma,nomme,nonce,nones,nonne,nopai,nopal,nopas,nopat,nopee,noper,nopes,nopez,nordi,noria,norme,notai,notas,notat,notee,noter,notes,notez,notre,nouai,nouas,nouat,nouba,nouee,nouer,noues,nouez,novai,novas,novat,novee,nover,noves,novez,noyai,noyas,noyat,noyau,noyee,noyer,noyes,noyez,nuage,nuais,nuait,nuant,nuees,nuent,nuera,nuiez,nuira,nuire,nuise,nuite,nuits,nulle,nuons,nuque,nurse,nylon,oasis,obeir,obeis,obeit,obele,obels,obera,obere,obese,obier,obits,objet,oblat,obole,obtus,obvia,obvie,occlu,ocean,ocrai,ocras,ocrat,ocree,ocrer,ocres,ocrez,octet,odeon,odeur,oeufs,oeuve,offre,oflag,ogive,ogres,oille,oings,ointe,oints,oisif,oison,okapi,oleum,olive,omble,ombra,ombre,omega,omets,omise,onces,oncle,ondee,ondes,ondin,ongle,opale,opens,opera,opere,opiat,opina,opine,opium,optai,optas,optat,opter,optes,optez,orage,orale,orant,oraux,orbes,ordre,orees,orges,orgie,orgue,oriel,orins,orles,orlon,ormes,ornai,ornas,ornat,ornee,orner,ornes,ornez,orobe,orpin,orque,ortie,orvet,osais,osait,osant,oscar,osees,osent,osera,oside,osier,osiez,osons,osque,ossue,ossus,otage,otais,otait,otant,otees,otent,otera,otiez,otite,otons,ouais,ouata,ouate,oubli,ouche,oueds,ouest,ouies,ouira,ourdi,ourla,ourle,ourse,ouste,outil,outra,outre,ouvra,ouvre,ovale,ovate,ovine,ovins,ovnis,ovula,ovule,oxyda,oxyde,oyais,oyats,ozene,ozone,pacha,packs,pacte,paddy,padou,pagea,pagee,pagel,pager,pages,pagez,pagne,pagre,pagus,paien,paies,pains,paire,pairs,palan,palee,pales,palet,palie,palir,palis,palit,palma,palme,palot,palpa,palpe,palud,palus,pamai,pamas,pamat,pamee,pamer,pames,pamez,pampa,panai,panas,panat,panax,panca,panda,panee,panel,paner,panes,panez,panic,panka,panna,panne,pansa,panse,pansu,paons,papal,papas,papes,papis,papys,paque,parai,paras,parat,parce,parcs,pardi,paree,pareo,parer,pares,parez,paria,parie,paris,parka,parla,parle,parme,parmi,paroi,paros,parsi,parte,parti,parts,parue,parus,parut,passa,passe,patai,patas,patat,patee,pater,pates,patez,patio,patir,patis,patit,paton,patre,patta,patte,pattu,pauma,paume,pausa,pause,pavai,pavas,pavat,pavee,paver,paves,pavez,pavie,pavot,payai,payas,payat,payee,payer,payes,payez,payse,peage,peans,peaux,pecha,peche,pedum,pegre,peina,peine,peins,peint,pekan,pekin,pelai,pelas,pelat,pelee,peler,peles,pelez,pelle,pelta,pelte,penal,pende,pends,pendu,penes,penil,penis,penne,penny,penon,pensa,pense,pente,pentu,peons,pepes,pepia,pepie,pepin,pepon,perca,perce,percu,perde,perds,perdu,peres,peril,perir,peris,perit,perla,perle,perot,perse,perte,pesai,pesas,pesat,pesee,peser,peses,pesez,peson,pesos,pesse,pesta,peste,petai,petas,petat,petee,peter,petes,petez,petit,peton,petre,petri,petun,peuls,peurs,pezes,phage,phare,phase,philo,phlox,phone,phono,photo,piafs,piano,pians,picas,picot,piece,pieds,piege,pieta,piete,pieux,pieze,pifai,pifas,pifat,pifee,pifer,pifes,pifez,piffa,piffe,pigea,pigee,piger,piges,pigez,pigne,pilaf,pilai,pilas,pilat,pilee,piler,piles,pilet,pilez,pilla,pille,pilon,pilou,pilum,pinca,pince,pinne,pinot,pinta,pinte,pions,pipai,pipas,pipat,pipee,piper,pipes,pipez,pipis,pipit,piqua,pique,pires,pises,pissa,pisse,pista,piste,pites,pitie,piton,pitre,pives,pivot,pizza,placa,place,plage,plaid,plaie,plais,plait,plana,plane,plans,plant,plate,plats,plebe,plein,pleur,pleut,pliai,plias,pliat,pliee,plier,plies,pliez,ploie,plomb,plots,plouc,plouf,plouk,ploya,ploye,pluie,pluma,plume,pneus,pocha,poche,poela,poele,poeme,poete,pogne,poids,poila,poile,poils,poilu,poing,poins,point,poire,poise,poker,polar,poles,polie,polio,polir,polis,polit,polka,polos,pomma,pomme,pompa,pompe,ponca,ponce,ponde,ponds,pondu,poney,ponge,ponta,ponte,ponts,pools,popes,poqua,poque,porcs,pores,porno,porta,porte,porto,ports,posai,posas,posat,posee,poser,poses,posez,posta,poste,potee,potes,potin,pouah,pouce,poufs,poule,pouls,poupe,prame,preau,prele,prend,preta,prete,prets,preux,prevu,priai,prias,priat,priee,prier,pries,priez,prima,prime,primo,prisa,prise,priva,prive,probe,profs,proie,prolo,promo,promu,prona,prone,prose,prote,proue,provo,prude,prune,psitt,psoas,ptose,puais,puait,puant,pubis,puces,puche,puees,puent,puera,puiez,puine,puisa,puise,puits,pulls,pulpe,pulsa,pulse,pumas,pumes,punas,punch,punie,punir,punis,punit,punks,puons,pupes,puree,pures,purge,purin,purot,pusse,putes,putti,putto,pyrex,quais,quand,quant,quark,quart,quasi,quels,queta,quete,queue,queux,quiet,quine,quint,quipo,quipu,quota,raban,rabat,rabbi,rabla,rable,rabot,racee,racer,races,racla,racle,radai,radar,radas,radat,radee,rader,rades,radez,radia,radie,radin,radio,radis,rafla,rafle,ragea,rager,rages,ragez,ragot,ragua,rague,raias,raide,raidi,raids,raies,rails,raina,raine,rajah,rajas,rakis,ralai,ralas,ralat,raler,rales,ralez,ramai,ramas,ramat,ramee,ramer,rames,ramez,ramie,ramis,rampa,rampe,rance,ranch,ranci,range,rangs,ranis,raout,rapai,rapas,rapat,rapee,raper,rapes,rapez,rapin,rapts,raqua,raque,rares,rasai,rasas,rasat,rasee,raser,rases,rasez,rashs,rasta,ratai,ratas,ratat,ratee,ratel,rater,rates,ratez,ratio,raton,raves,ravie,ravin,ravir,ravis,ravit,rayai,rayas,rayat,rayee,rayer,rayes,rayez,rayon,reacs,reagi,reais,reait,reale,reant,reaux,rebab,rebat,rebec,rebus,rebut,recel,reces,recez,reche,recif,recit,recru,recta,recto,recue,recul,recus,recut,redan,redie,redis,redit,redue,redus,redut,reels,reelu,reent,reera,refis,refit,refus,regal,regie,regir,regis,regit,regla,regle,reglo,regna,regne,reiez,reine,reins,rejet,relax,relia,relie,relis,relit,relue,relus,relut,remet,remis,remit,remiz,remua,remue,renal,rende,rends,rendu,renee,renes,renia,renie,renne,renom,renta,rente,reons,repas,repic,repit,repli,replu,repos,repue,repus,reput,resta,reste,retif,retro,reuni,revai,revas,revat,revee,rever,reves,revet,revez,revis,revit,revue,revus,rhuma,rhumb,rhume,rhums,riais,riait,rials,riant,ribla,rible,riche,ricin,ridai,ridas,ridat,ridee,rider,rides,ridez,riels,riens,rient,rieur,rifla,rifle,rifts,riiez,rimai,rimas,rimat,rimee,rimer,rimes,rimez,rinca,rince,rings,rions,ripai,ripas,ripat,ripee,riper,ripes,ripez,rirai,riras,rires,rirez,risee,risse,rital,rites,rivai,rival,rivas,rivat,rivee,river,rives,rivet,rivez,rixes,robai,robas,robat,robee,rober,robes,robez,robin,robot,roche,rocks,rocou,rodai,rodas,rodat,rodee,rodeo,roder,rodes,rodez,rogna,rogne,rogue,roide,roidi,roles,roman,rompe,romps,rompt,rompu,ronce,ronde,rondi,rondo,ronds,roneo,ronge,roqua,roque,rosai,rosas,rosat,rosee,roser,roses,rosez,rosie,rosir,rosis,rosit,rossa,rosse,rotai,rotas,rotat,roter,rotes,rotez,rotie,rotin,rotir,rotis,rotit,rotor,rouai,rouan,rouas,rouat,rouee,rouer,roues,rouet,rouez,roufs,rouge,rougi,rouie,rouir,rouis,rouit,roula,roule,roumi,round,routa,route,royal,ruade,ruais,ruait,ruant,ruban,rubis,rucha,ruche,rudes,ruees,ruent,ruera,rugby,rugir,rugis,rugit,ruiez,ruila,ruile,ruina,ruine,rumba,rumen,rumex,ruolz,ruons,rupin,rural,rusai,rusas,rusat,rusee,ruser,ruses,rusez,rushs,russe,sabir,sabla,sable,sabot,sabra,sabre,sache,sacra,sacre,safre,sagas,sages,sagou,sagum,sahel,saiga,saine,sains,saint,saisi,saite,sajou,sakes,sakis,salai,salas,salat,salee,salep,saler,sales,salez,salie,salin,salir,salis,salit,salle,salol,salon,salop,salsa,salse,salua,salue,salut,salve,samba,samit,sampi,sanas,sangs,sanie,sante,sanve,sanza,saoul,sapai,sapas,sapat,sapee,saper,sapes,sapez,sapin,saqua,saque,sarde,saris,saros,sassa,sasse,satin,satis,sauca,sauce,sauge,saule,sauna,saune,saura,saure,sauri,saurs,sauta,saute,sauts,sauva,sauve,savez,savon,saxes,saxon,saxos,sayon,sbire,scalp,scare,scats,sceau,scene,schah,sciai,scias,sciat,sciee,scier,scies,sciez,scion,scoop,score,scout,scull,scuta,seant,seaux,sebka,sebum,secha,seche,secte,seide,seime,seine,seing,seins,seize,selfs,sella,selle,selon,seltz,selve,semai,semas,semat,semee,semer,semes,semez,semis,senat,senau,senes,senne,sense,sente,senti,seoir,sepia,serac,serai,seras,serbe,serez,serfs,serge,seria,serie,serin,serpe,serra,serre,serte,serti,serum,serve,servi,seton,seuil,seule,seuls,seves,sevir,sevis,sevit,sevra,sevre,sexes,sexte,sexto,sexue,shahs,shako,shoot,short,shows,shunt,sicle,siege,siens,siera,sieur,sigle,sigma,signa,signe,silex,silos,simas,singe,sinon,sinus,sioux,sires,sirex,sirli,sirop,sisal,sises,sitar,sites,sitot,situa,situe,siums,sixte,skais,skate,skiai,skias,skiat,skier,skies,skiez,skiff,skifs,slang,slave,slips,sloop,slows,smala,smalt,smart,smash,smogs,smolt,smurf,snack,sniff,snoba,snobe,snobs,sobre,socle,sodas,sodee,sodes,soeur,sofas,soies,soifs,soins,soirs,sojas,solda,solde,solen,soles,solex,solin,solos,somas,somma,somme,sonar,sonda,sonde,songe,sonna,sonne,sonos,sorbe,sores,sorte,sorti,sorts,sosie,sotch,sotie,sotte,souci,souda,soude,soues,souks,soula,soule,souls,soupa,soupe,sourd,souri,soute,soyas,soyer,soyez,spahi,spart,spath,speos,sphex,spire,spore,sport,spots,sprat,spray,sprue,squat,squaw,stade,staff,stage,stand,stars,stase,steak,stele,stemm,stems,steno,stera,stere,stick,stipe,stock,stops,store,stout,stras,stria,strie,strix,stucs,styla,style,stylo,suage,suais,suait,suant,suave,suber,subie,subir,subis,subit,sucai,sucas,sucat,sucee,sucer,suces,sucez,sucon,sucra,sucre,suede,suees,suent,suera,sueur,suies,suiez,suifa,suife,suifs,suint,suite,suive,suivi,sujet,sulky,sumac,sumes,sunna,suons,super,supin,supra,surah,sures,suret,surfa,surfe,surfs,surgi,surin,surir,suris,surit,suros,sushi,susse,sutes,sutra,swaps,swing,sylve,sympa,tabac,tabar,tabes,tabla,table,tabor,tabou,tacca,tacet,tacha,tache,tacon,tacot,tacts,tafia,tagal,taies,taiga,tains,taira,taire,taise,talai,talas,talat,talcs,talee,taler,tales,talez,talla,talle,talon,talus,tamia,tamil,tamis,tanca,tance,tango,tanin,tanks,tanna,tanne,tante,taons,tapai,tapas,tapat,tapee,taper,tapes,tapez,tapie,tapin,tapir,tapis,tapit,tapon,taqua,taque,tarai,taras,tarat,tarda,tarde,taree,tarer,tares,taret,tarez,targe,tarie,tarif,tarin,tarir,taris,tarit,tarot,tarse,tarte,tarti,tassa,tasse,tatai,tatas,tatat,tatee,tater,tates,tatez,tatou,taule,taupe,taure,taxai,taxas,taxat,taxee,taxer,taxes,taxez,taxie,taxis,taxon,tchao,tecks,teins,teint,teles,telex,telle,tells,tempe,tempo,temps,tende,tends,tendu,tenez,tenia,tenir,tenon,tenor,tenta,tente,tenue,tenus,terca,terce,terme,terne,terni,terra,terre,terri,tersa,terse,testa,teste,tests,tetai,tetas,tetat,tetee,teter,tetes,tetez,tetin,teton,tetra,tette,tetue,tetus,texan,texte,thaie,theme,these,theta,thons,thora,thune,thuya,thyms,tians,tiare,tibia,tiede,tiedi,tiens,tient,tiers,tiffe,tiges,tigra,tigre,tilde,tilla,tille,tilts,timon,tinta,tinte,tiqua,tique,tirai,tiras,tirat,tiree,tirer,tires,tiret,tirez,tisai,tisas,tisat,tisee,tiser,tises,tisez,tison,tissa,tisse,tissu,titan,titis,titra,titre,tmese,toast,toges,toila,toile,toisa,toise,toits,tokai,tokay,tolee,toles,tolet,tolle,tolus,tomai,tomas,tomat,tomba,tombe,tomee,tomer,tomes,tomez,tomme,tommy,tonal,tonde,tonds,tondu,tonie,tonka,tonna,tonne,tonte,tonus,topai,topas,topat,toper,topes,topez,topos,toqua,toque,torah,torde,tords,tordu,torea,toree,torii,toril,toron,torse,torts,torve,total,totem,toton,totos,touai,touas,touat,touee,touer,toues,touez,tourd,tours,toute,touts,trabe,traca,trace,tracs,tract,trahi,traie,train,trais,trait,trama,trame,trams,trapu,trema,treve,triai,trial,trias,triat,tribu,tridi,triee,trier,tries,triez,trima,trime,trine,trins,triol,trios,tripe,trips,trocs,trois,troll,trona,tronc,trone,trope,trots,troua,troue,trous,trucs,truie,trust,tsars,tuage,tuais,tuait,tuant,tubai,tubas,tubat,tubee,tuber,tubes,tubez,tuees,tuent,tuera,tueur,tuiez,tuila,tuile,tulle,tumes,tuner,tunes,tuons,tuque,turbe,turco,turcs,turfs,turne,tusse,tutes,tutie,tutti,tutus,tuyau,tweed,twist,typai,typas,typat,typee,typer,types,typez,typha,typon,typos,tyran,tzars,ubacs,ukase,ulema,ultra,ulula,ulule,ulves,unaus,unies,union,unira,unite,urane,urate,urees,urgea,urger,urina,urine,urnes,urubu,usage,usais,usait,usant,usees,usent,usera,usiez,usina,usine,usite,usnee,usons,usuel,usure,utile,uvale,uvaux,uvees,uvula,uvule,vache,vagin,vagir,vagis,vagit,vagua,vague,vainc,vaine,vains,vaire,vairs,valet,valez,valsa,valse,value,valus,valut,valve,vampa,vampe,vamps,vanda,vanna,vanne,vanta,vante,vapes,vaqua,vaque,varan,varia,varie,varus,varve,vases,vaste,veaux,veces,vecue,vecus,vecut,vedas,veina,veine,velai,velar,velas,velat,velds,veler,veles,velez,velie,velin,velos,velot,velte,velue,velum,velus,venal,vende,vends,vendu,venet,venez,venge,venin,venir,venta,vente,vents,venue,venus,verbe,verdi,verge,verin,verni,verra,verre,versa,verse,verso,verte,verts,vertu,verve,vesce,vespa,vessa,vesse,veste,vetes,vetez,vetir,vetis,vetit,vetue,vetus,veufs,veule,veuve,vexai,vexas,vexat,vexee,vexer,vexes,vexez,vibra,vibre,vices,vichy,vicia,vicie,vidai,vidas,vidat,videe,video,vider,vides,videz,vieil,viens,vient,vieux,vigie,vigne,viles,villa,ville,vimes,vinai,vinas,vinat,vinee,viner,vines,vinez,vingt,viocs,viola,viole,viols,virai,viral,viras,virat,viree,virer,vires,virez,viril,virus,visai,visas,visat,visee,viser,vises,visez,vison,vissa,visse,vitae,vital,vites,vitra,vitre,vivat,vives,vivez,vivra,vivre,vizir,vocal,vodka,voeux,vogua,vogue,voici,voies,voila,voile,voire,volai,volas,volat,volee,voler,voles,volet,volez,volis,volta,volte,volts,volve,vomer,vomie,vomir,vomis,vomit,votai,votas,votat,votee,voter,votes,votez,votif,votre,vouai,vouas,vouat,vouee,vouer,voues,vouez,vouge,voulu,vouta,voute,voyer,voyez,voyou,vraie,vrais,vulgo,vulve,wagon,watts,weber,wharf,whigs,whist,winch,xenon,xeres,xerus,xipho,xyste,yacht,yacks,yards,yeble,yeuse,yogas,yogis,yoles,yucca,zabre,zains,zanis,zanni,zanzi,zazou,zebra,zebre,zebus,zelee,zeles,zends,zeros,zesta,zeste,zibai,zibas,zibat,zibee,ziber,zibes,zibez,zigua,zigue,zincs,zippa,zippe,zizis,zloty,zoile,zombi,zonai,zonal,zonas,zonat,zonee,zoner,zones,zonez,zooms,zozos');
var $author$project$Main$getWords = function (lang) {
	if (!lang) {
		return $author$project$Words$english;
	} else {
		return $author$project$Words$french;
	}
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
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
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
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
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
				A2($elm_community$list_extra$List$Extra$getAt, _int, words));
		},
		A2(
			$elm$random$Random$int,
			0,
			$elm$core$List$length(words) - 1));
};
var $author$project$Main$getRandomWord = A2(
	$elm$core$Basics$composeR,
	$author$project$Main$getWords,
	A2(
		$elm$core$Basics$composeR,
		$author$project$Main$randomWord,
		$elm$random$Random$generate($author$project$Main$NewWord)));
var $author$project$Main$Idle = {$: 0};
var $author$project$Main$initialModel = function (store) {
	return {
		au: $elm$core$Maybe$Nothing,
		z: $author$project$Main$Idle,
		Y: store,
		ax: $elm$time$Time$millisToPosix(0)
	};
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$I18n$parseLang = function (string) {
	return A2($elm$core$String$startsWith, 'fr', string) ? 1 : 0;
};
var $author$project$Main$init = function (flags) {
	var store = A2($elm$json$Json$Decode$decodeString, $author$project$Main$decodeStore, flags.br);
	var _v0 = function () {
		if (!store.$) {
			var store_ = store.a;
			return _Utils_Tuple2(
				$author$project$Main$initialModel(store_),
				$elm$core$Platform$Cmd$none);
		} else {
			var error = store.a;
			var newStore = $author$project$Main$defaultStore(
				$author$project$I18n$parseLang(flags.ac));
			var newModel = $author$project$Main$initialModel(newStore);
			return _Utils_Tuple2(
				_Utils_update(
					newModel,
					{
						z: $author$project$Main$Errored(
							$author$project$Main$DecodeError(
								$elm$json$Json$Decode$errorToString(error)))
					}),
				$author$project$Main$encodeAndSaveStore(newStore));
		}
	}();
	var model = _v0.a;
	var cmds = _v0.b;
	return _Utils_Tuple2(
		model,
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Main$getRandomWord(model.Y.ac),
					cmds
				])));
};
var $author$project$Main$NewTime = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$StoreChanged = function (a) {
	return {$: 8, a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $author$project$Main$BackSpace = {$: 0};
var $author$project$Main$CloseModal = {$: 1};
var $author$project$Main$KeyPressed = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$Submit = {$: 9};
var $elm$json$Json$Decode$fail = _Json_fail;
var $author$project$Main$decodeKey = A2(
	$elm$json$Json$Decode$andThen,
	function (key) {
		var _v0 = $elm$core$String$uncons(key);
		if ((!_v0.$) && (_v0.a.b === '')) {
			var _v1 = _v0.a;
			var _char = _v1.a;
			return (($elm$core$Char$toCode(_char) < 65) || ($elm$core$Char$toCode(_char) > 122)) ? $elm$json$Json$Decode$fail('discarded char') : $elm$json$Json$Decode$succeed(
				$author$project$Main$KeyPressed(_char));
		} else {
			return (key === 'Backspace') ? $elm$json$Json$Decode$succeed($author$project$Main$BackSpace) : ((key === 'Enter') ? $elm$json$Json$Decode$succeed($author$project$Main$Submit) : ((key === 'Escape') ? $elm$json$Json$Decode$succeed($author$project$Main$CloseModal) : $elm$json$Json$Decode$fail('discarded key')));
		}
	},
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {cr: processes, cG: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.cr;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.cG);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Document = 0;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {ck: pids, cF: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {bU: event, b7: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.ck,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
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
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.b7;
		var event = _v0.bU;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.cF);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, 0, 'keydown');
var $author$project$Main$storeChanged = _Platform_incomingPort('storeChanged', $elm$json$Json$Decode$string);
var $author$project$Main$subscriptions = function (_v0) {
	var state = _v0.z;
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2($elm$time$Time$every, 1000, $author$project$Main$NewTime),
				$author$project$Main$storeChanged($author$project$Main$StoreChanged),
				function () {
				if (state.$ === 2) {
					return $elm$browser$Browser$Events$onKeyDown($author$project$Main$decodeKey);
				} else {
					return $elm$core$Platform$Sub$none;
				}
			}()
			]));
};
var $author$project$Main$LoadError = {$: 1};
var $author$project$Main$Ongoing = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $author$project$Main$numberOfLetters = 5;
var $author$project$Main$addChar = F2(
	function (_char, input) {
		return A3(
			$elm$core$String$slice,
			0,
			$author$project$Main$numberOfLetters,
			_Utils_ap(
				input,
				$elm$core$String$fromChar(_char)));
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
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $author$project$Main$hasWon = function (guesses) {
	if (!guesses.b) {
		return false;
	} else {
		var last = guesses.a;
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
	function (word, guesses) {
		return $author$project$Main$hasWon(guesses) ? A2($author$project$Main$Won, word, guesses) : ((_Utils_cmp(
			$elm$core$List$length(guesses),
			$author$project$Main$maxAttempts) > -1) ? A2($author$project$Main$Lost, word, guesses) : A4($author$project$Main$Ongoing, word, guesses, '', $elm$core$Maybe$Nothing));
	});
var $author$project$Main$NoOp = {$: 6};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task)));
	});
var $elm$browser$Browser$Dom$blur = _Browser_call('blur');
var $elm$core$Process$sleep = _Process_sleep;
var $author$project$Main$defocus = function (domId) {
	return A2(
		$elm$core$Task$attempt,
		$elm$core$Basics$always($author$project$Main$NoOp),
		A2(
			$elm$core$Task$andThen,
			function (_v0) {
				return $elm$browser$Browser$Dom$blur(domId);
			},
			$elm$core$Process$sleep(1)));
};
var $author$project$Main$defocusMenuButtons = $elm$core$Platform$Cmd$batch(
	A2(
		$elm$core$List$map,
		$author$project$Main$defocus,
		_List_fromArray(
			['btn-lang-en', 'btn-lang-fr', 'btn-stats', 'btn-help'])));
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $author$project$Main$logEntry = F2(
	function (log, store) {
		var logs = store.as;
		return _Utils_update(
			store,
			{
				as: A2($elm$core$List$cons, log, logs)
			});
	});
var $author$project$Main$logResult = function (_v0) {
	var model = _v0.a;
	var store = model.Y;
	var state = model.z;
	var time = model.ax;
	var cmds = _v0.b;
	var logData = function () {
		switch (state.$) {
			case 4:
				var word = state.a;
				var guesses = state.b;
				return $elm$core$Maybe$Just(
					_Utils_Tuple3(
						true,
						word,
						$elm$core$List$length(guesses)));
			case 3:
				var word = state.a;
				var guesses = state.b;
				return $elm$core$Maybe$Just(
					_Utils_Tuple3(
						false,
						word,
						$elm$core$List$length(guesses)));
			default:
				return $elm$core$Maybe$Nothing;
		}
	}();
	if (!logData.$) {
		var _v2 = logData.a;
		var victory = _v2.a;
		var word = _v2.b;
		var nbAttempts = _v2.c;
		var newStore = A2(
			$author$project$Main$logEntry,
			A5($author$project$Main$Log, time, store.ac, word, victory, nbAttempts),
			store);
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{Y: newStore}),
			$author$project$Main$encodeAndSaveStore(newStore));
	} else {
		return _Utils_Tuple2(model, cmds);
	}
};
var $author$project$Main$removeAlert = function (state) {
	if ((state.$ === 2) && (!state.d.$)) {
		var word = state.a;
		var guesses = state.b;
		var input = state.c;
		return A4($author$project$Main$Ongoing, word, guesses, input, $elm$core$Maybe$Nothing);
	} else {
		return state;
	}
};
var $elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var $elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var $author$project$Main$scrollToBottom = function (id) {
	return A2(
		$elm$core$Task$attempt,
		$elm$core$Basics$always($author$project$Main$NoOp),
		A2(
			$elm$core$Task$andThen,
			function (_v1) {
				var scene = _v1.d3;
				return A3($elm$browser$Browser$Dom$setViewportOf, id, 0, scene.$7);
			},
			A2(
				$elm$core$Task$andThen,
				function (_v0) {
					return $elm$browser$Browser$Dom$getViewportOf(id);
				},
				$elm$core$Process$sleep(10))));
};
var $author$project$I18n$AbsentFromDictionary = function (a) {
	return {$: 0, a: a};
};
var $author$project$I18n$NotEnoughLetters = {$: 17};
var $author$project$Main$Correct = function (a) {
	return {$: 1, a: a};
};
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
var $author$project$Main$letterIs = F2(
	function (build, _char) {
		return $elm$core$Basics$eq(
			build(_char));
	});
var $author$project$Main$handleCorrectDuplicates = F2(
	function (wordChars, guess) {
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
								A2($author$project$Main$letterIs, $author$project$Main$Correct, c),
								guess)));
					var nbCharsInWord = _v1.a;
					var nbCorrectInAttempt = _v1.b;
					return (_Utils_cmp(nbCorrectInAttempt, nbCharsInWord) > -1) ? $author$project$Main$Handled(c) : letter;
				} else {
					return letter;
				}
			},
			guess);
	});
var $author$project$Main$Misplaced = function (a) {
	return {$: 2, a: a};
};
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
								A2($author$project$Main$letterIs, $author$project$Main$Misplaced, c),
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
		return {du: index, ca: match, dR: number, d8: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{c$: false, dF: false},
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
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$I18n$Set = F2(
	function (english, french) {
		return {bT: english, bZ: french};
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $lukewestby$elm_string_interpolate$String$Interpolate$applyInterpolation = F2(
	function (replacements, _v0) {
		var match = _v0.ca;
		var ordinalString = A2(
			$elm$core$Basics$composeL,
			$elm$core$String$dropLeft(1),
			$elm$core$String$dropRight(1))(match);
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$andThen,
				function (value) {
					return A2($elm$core$Array$get, value, replacements);
				},
				$elm$core$String$toInt(ordinalString)));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{u: nodeList, p: nodeListSize, t: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $lukewestby$elm_string_interpolate$String$Interpolate$interpolationRegex = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('\\{\\d+\\}'));
var $lukewestby$elm_string_interpolate$String$Interpolate$interpolate = F2(
	function (string, args) {
		var asArray = $elm$core$Array$fromList(args);
		return A3(
			$elm$regex$Regex$replace,
			$lukewestby$elm_string_interpolate$String$Interpolate$interpolationRegex,
			$lukewestby$elm_string_interpolate$String$Interpolate$applyInterpolation(asArray),
			string);
	});
var $author$project$I18n$set = F3(
	function (params, english, french) {
		return A2(
			$author$project$I18n$Set,
			A2($lukewestby$elm_string_interpolate$String$Interpolate$interpolate, english, params),
			A2($lukewestby$elm_string_interpolate$String$Interpolate$interpolate, french, params));
	});
var $author$project$I18n$getSet = function (id) {
	switch (id.$) {
		case 0:
			var lang = id.a.ac;
			var word = id.a.ex;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang),
						word
					]),
				'Not in {0} dictionary: {1}',
				'Absent du dictionnaire {0}\u00A0: {1}');
		case 1:
			return A3($author$project$I18n$set, _List_Nil, 'Unable to restore previously saved data.', 'Impossible de restaurer les données précedemment sauvegardées.');
		case 2:
			return A3($author$project$I18n$set, _List_Nil, 'Definition', 'Définition');
		case 3:
			var error = id.a.dd;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[error]),
				'Erreur: {0}',
				'Erreur\u00A0: {0}');
		case 4:
			return A3($author$project$I18n$set, _List_Nil, 'Loading game…', 'Chargement du jeu…');
		case 5:
			return A3($author$project$I18n$set, _List_Nil, 'Ok that was hard.', 'Pas facile, hein\u00A0?');
		case 6:
			return A3($author$project$I18n$set, _List_Nil, 'Well done!', 'Bien joué\u00A0!');
		case 7:
			return A3($author$project$I18n$set, _List_Nil, 'Help', 'Aide');
		case 8:
			var nbLetters = id.a.dJ;
			var lang = id.a.ac;
			var maxGuesses = id.a.dD;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$elm$core$String$fromInt(nbLetters),
						$author$project$I18n$langToString(lang),
						$elm$core$String$fromInt(maxGuesses)
					]),
				'Guess a {0} letters {1} word in {2} guesses or less.',
				'Devinez un mot {1} de {0} lettres en {2} essais ou moins.');
		case 10:
			return A3($author$project$I18n$set, _List_Nil, 'In this example:', 'Dans cet exemple\u00A0:');
		case 9:
			var wordleUrl = id.a.ey;
			var githubUrl = id.a.dl;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[wordleUrl, githubUrl]),
				'Inspired by [Wordle]({0}) - [Source code]({1}).',
				'Inspiré de [Wordle]({0}) - [Code source]({1}).');
		case 11:
			return A3($author$project$I18n$set, _List_Nil, 'Use your dekstop computer keyboard to enter words, or the virtual one at the bottom.', 'Utilisez le clavier de votre ordinateur pour saisir vos propositions, ou celui proposé au bas de l\'écran.');
		case 12:
			return A3($author$project$I18n$set, _List_Nil, 'The keyboard at the bottom highlight letters which have been played already.', 'Le clavier en bas de page met en relief les lettres qui ont déjà été joué.');
		case 13:
			var letter = id.a.bg;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[letter]),
				'{0} is at the correct spot',
				'{0} est à la bonne position');
		case 14:
			var letter = id.a.bg;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[letter]),
				'{0} is misplaced',
				'{0} est mal positionnée');
		case 15:
			var letter = id.a.bg;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[letter]),
				'{0} is unused',
				'{0} n\'est pas utilisée');
		case 16:
			return A3($author$project$I18n$set, _List_Nil, 'Unable to pick a word.', 'Impossible de sélectionner un mot à trouver.');
		case 17:
			return A3($author$project$I18n$set, _List_Nil, 'Not enough letters', 'Mot trop court');
		case 18:
			return A3($author$project$I18n$set, _List_Nil, 'Play again', 'Rejouer');
		case 19:
			return A3($author$project$I18n$set, _List_Nil, 'average guesses', 'essais en moyenne');
		case 20:
			return A3($author$project$I18n$set, _List_Nil, 'Stats', 'Stats');
		case 21:
			var lang = id.a.ac;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang)
					]),
				'games played in {0}',
				'parties jouées en {0}');
		case 22:
			var lang = id.a.ac;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang)
					]),
				'Guess distribution ({0})',
				'Distribution des scores ({0})');
		case 23:
			var lang = id.a.ac;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang)
					]),
				'Guess evolution ({0})',
				'Évolution des scores ({0})');
		case 24:
			var lang = id.a.ac;
			var length = id.a.dA;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang),
						$elm$core$String$fromInt(length)
					]),
				'Chart based on latest {1} plated games in {0}. A 0 bar means lost game.',
				'Graphique basé sur les {1} dernières parties jouées en {0}. La valeur 0 correspond à une partie perdue.');
		case 25:
			var lang = id.a.ac;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang)
					]),
				'Statistics ({0})',
				'Statistiques ({0})');
		case 27:
			return A3($author$project$I18n$set, _List_Nil, 'No game data yet', 'Pas de données de parties jouées');
		case 26:
			var lang = id.a.ac;
			return A3(
				$author$project$I18n$set,
				_List_fromArray(
					[
						$author$project$I18n$langToString(lang)
					]),
				'You haven\'t played in {0} yet, so I can\'t render any stats.',
				'Vous n\'avez pas encore joué en {0}, je ne peux pas afficher de statistiques.');
		default:
			return A3($author$project$I18n$set, _List_Nil, 'win rate', 'de parties gagnées');
	}
};
var $author$project$I18n$translate = F2(
	function (lang, id) {
		if (!lang) {
			return function ($) {
				return $.bT;
			}(
				$author$project$I18n$getSet(id));
		} else {
			return function ($) {
				return $.bZ;
			}(
				$author$project$I18n$getSet(id));
		}
	});
var $author$project$Main$validateGuess = F3(
	function (lang, word, input) {
		var normalize = A2($elm$core$Basics$composeR, $elm$core$String$toLower, $elm_community$string_extra$String$Extra$removeAccents);
		var _v0 = _Utils_Tuple2(
			$elm$core$String$toList(
				normalize(word)),
			$elm$core$String$toList(
				normalize(input)));
		var wordChars = _v0.a;
		var inputChars = _v0.b;
		return (!_Utils_eq(
			$elm$core$List$length(inputChars),
			$author$project$Main$numberOfLetters)) ? $elm$core$Result$Err(
			A2($author$project$I18n$translate, lang, $author$project$I18n$NotEnoughLetters)) : ((!A2(
			$elm$core$List$member,
			normalize(input),
			$author$project$Main$getWords(lang))) ? $elm$core$Result$Err(
			A2(
				$author$project$I18n$translate,
				lang,
				$author$project$I18n$AbsentFromDictionary(
					{ac: lang, ex: input}))) : $elm$core$Result$Ok(
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
						wordChars)))));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		var store = model.Y;
		var _v0 = _Utils_Tuple2(msg, model.z);
		_v0$9:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (_v0.b.$ === 2) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						var word = _v2.a;
						var guesses = _v2.b;
						var input = _v2.c;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									z: A4(
										$author$project$Main$Ongoing,
										word,
										guesses,
										A2($elm$core$String$dropRight, 1, input),
										$elm$core$Maybe$Nothing)
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var _v3 = _v0.a;
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 1:
					var _v4 = _v0.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{au: $elm$core$Maybe$Nothing}),
						$author$project$Main$defocusMenuButtons);
				case 2:
					if (_v0.b.$ === 2) {
						var _char = _v0.a.a;
						var _v5 = _v0.b;
						var word = _v5.a;
						var guesses = _v5.b;
						var input = _v5.c;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									z: A4(
										$author$project$Main$Ongoing,
										word,
										guesses,
										A2($author$project$Main$addChar, _char, input),
										$elm$core$Maybe$Nothing)
								}),
							$author$project$Main$scrollToBottom('board-container'));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 3:
					var _v6 = _v0.a;
					var newModel = $author$project$Main$initialModel(store);
					return _Utils_Tuple2(
						newModel,
						$author$project$Main$getRandomWord(store.ac));
				case 4:
					var time = _v0.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{ax: time}),
						$elm$core$Platform$Cmd$none);
				case 5:
					if (!_v0.a.a.$) {
						if (!_v0.b.$) {
							var newWord = _v0.a.a.a;
							var _v7 = _v0.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										z: A4($author$project$Main$Ongoing, newWord, _List_Nil, '', $elm$core$Maybe$Nothing)
									}),
								$author$project$Main$defocusMenuButtons);
						} else {
							break _v0$9;
						}
					} else {
						if (!_v0.b.$) {
							var _v8 = _v0.a.a;
							var _v9 = _v0.b;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										z: $author$project$Main$Errored($author$project$Main$LoadError)
									}),
								$elm$core$Platform$Cmd$none);
						} else {
							break _v0$9;
						}
					}
				case 6:
					var _v10 = _v0.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 7:
					var modal = _v0.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								au: $elm$core$Maybe$Just(modal),
								z: $author$project$Main$removeAlert(model.z)
							}),
						$elm$core$Platform$Cmd$none);
				case 8:
					var rawStore = _v0.a.a;
					var _v11 = A2($elm$json$Json$Decode$decodeString, $author$project$Main$decodeStore, rawStore);
					if (!_v11.$) {
						var newStore = _v11.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{Y: newStore}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				case 9:
					if (_v0.b.$ === 2) {
						var _v12 = _v0.a;
						var _v13 = _v0.b;
						var word = _v13.a;
						var guesses = _v13.b;
						var input = _v13.c;
						var _v14 = A3($author$project$Main$validateGuess, store.ac, word, input);
						if (!_v14.$) {
							var guess = _v14.a;
							return $author$project$Main$logResult(
								_Utils_Tuple2(
									_Utils_update(
										model,
										{
											z: A2(
												$author$project$Main$checkGame,
												word,
												A2($elm$core$List$cons, guess, guesses))
										}),
									$author$project$Main$scrollToBottom('board-container')));
						} else {
							var error = _v14.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										z: A4(
											$author$project$Main$Ongoing,
											word,
											guesses,
											input,
											$elm$core$Maybe$Just(error))
									}),
								$elm$core$Platform$Cmd$none);
						}
					} else {
						var _v15 = _v0.a;
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				default:
					var lang = _v0.a.a;
					var newStore = _Utils_update(
						store,
						{ac: lang});
					var newModel = $author$project$Main$initialModel(newStore);
					return _Utils_Tuple2(
						newModel,
						$elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$encodeAndSaveStore(newStore),
									$author$project$Main$getRandomWord(lang)
								])));
			}
		}
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$I18n$GameLoading = {$: 4};
var $author$project$I18n$GameLost = {$: 5};
var $author$project$I18n$GameWin = {$: 6};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$alert = F2(
	function (level, message) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('Flash alert alert-' + level)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(message)
				]));
	});
var $author$project$I18n$Definition = {$: 2};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $author$project$I18n$htmlText = F2(
	function (lang, id) {
		return $elm$html$Html$text(
			A2($author$project$I18n$translate, lang, id));
	});
var $elm$html$Html$i = _VirtualDom_node('i');
var $author$project$Main$icon = function (name) {
	return A2(
		$elm$html$Html$i,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('me-1 icon icon-' + name)
			]),
		_List_Nil);
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Main$definitionLink = F2(
	function (lang, word) {
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('btn btn-lg btn-info'),
					$elm$html$Html$Attributes$target('_blank'),
					$elm$html$Html$Attributes$href(
					function () {
						if (lang === 1) {
							return 'https://fr.wiktionary.org/wiki/' + word;
						} else {
							return 'https://en.wiktionary.org/wiki/' + word;
						}
					}())
				]),
			_List_fromArray(
				[
					$author$project$Main$icon('definition'),
					A2($author$project$I18n$htmlText, lang, $author$project$I18n$Definition)
				]));
	});
var $author$project$Main$NewGame = {$: 3};
var $author$project$I18n$PlayAgain = {$: 18};
var $elm$html$Html$button = _VirtualDom_node('button');
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
var $author$project$Main$newGameButton = function (lang) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('btn btn-lg btn-success'),
				$elm$html$Html$Events$onClick($author$project$Main$NewGame)
			]),
		_List_fromArray(
			[
				$author$project$Main$icon('play-again'),
				A2($author$project$I18n$htmlText, lang, $author$project$I18n$PlayAgain)
			]));
};
var $author$project$Main$endGameButtons = F2(
	function (lang, word) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('EndGameButtons')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('btn-group w-100')
						]),
					_List_fromArray(
						[
							A2($author$project$Main$definitionLink, lang, word),
							$author$project$Main$newGameButton(lang)
						]))
				]));
	});
var $author$project$I18n$Help = {$: 7};
var $author$project$I18n$StatsLang = function (a) {
	return {$: 25, a: a};
};
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $author$project$Main$HelpModal = 0;
var $author$project$Main$OpenModal = function (a) {
	return {$: 7, a: a};
};
var $author$project$I18n$StatsButton = {$: 20};
var $author$project$Main$StatsModal = 1;
var $author$project$Main$SwitchLang = function (a) {
	return {$: 10, a: a};
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
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$Main$viewHeader = function (_v0) {
	var store = _v0.Y;
	var modal = _v0.au;
	var btnClass = function (active) {
		return $elm$html$Html$Attributes$classList(
			_List_fromArray(
				[
					_Utils_Tuple2('btn-dark', !active),
					_Utils_Tuple2('btn-primary', active)
				]));
	};
	return A2(
		$elm$html$Html$nav,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('navbar sticky-top navbar-dark bg-dark')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('Header container-fluid flex-nowrap')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-white fw-bold me-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Wordlem')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$id('btn-lang-en'),
								$elm$html$Html$Attributes$class('HeaderButton btn btn-sm text-truncate'),
								btnClass(!store.ac),
								$elm$html$Html$Events$onClick(
								$author$project$Main$SwitchLang(0))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('English')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$id('btn-lang-fr'),
								$elm$html$Html$Attributes$class('HeaderButton btn btn-sm text-truncate'),
								btnClass(store.ac === 1),
								$elm$html$Html$Events$onClick(
								$author$project$Main$SwitchLang(1))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Français')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$id('btn-stats'),
								$elm$html$Html$Attributes$class('HeaderButton btn btn-sm text-truncate'),
								btnClass(
								_Utils_eq(
									modal,
									$elm$core$Maybe$Just(1))),
								$elm$html$Html$Events$onClick(
								$author$project$Main$OpenModal(1))
							]),
						_List_fromArray(
							[
								$author$project$Main$icon('stats'),
								A2($author$project$I18n$htmlText, store.ac, $author$project$I18n$StatsButton)
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$id('btn-help'),
								$elm$html$Html$Attributes$class('HeaderButton btn btn-sm text-truncate'),
								btnClass(
								_Utils_eq(
									modal,
									$elm$core$Maybe$Just(0))),
								$elm$html$Html$Events$onClick(
								$author$project$Main$OpenModal(0))
							]),
						_List_fromArray(
							[
								$author$project$Main$icon('help'),
								A2($author$project$I18n$htmlText, store.ac, $author$project$I18n$Help)
							]))
					]))
			]));
};
var $author$project$I18n$HelpGamePitch = function (a) {
	return {$: 8, a: a};
};
var $author$project$I18n$HelpInThisExample = {$: 10};
var $author$project$I18n$HelpInspiredBy = function (a) {
	return {$: 9, a: a};
};
var $author$project$I18n$HelpKeyboard = {$: 11};
var $author$project$I18n$HelpKeyboardLetter = {$: 12};
var $author$project$I18n$HelpLetterCorrectlyPlaced = function (a) {
	return {$: 13, a: a};
};
var $author$project$I18n$HelpLetterMisplaced = function (a) {
	return {$: 14, a: a};
};
var $author$project$I18n$HelpLetterUnused = function (a) {
	return {$: 15, a: a};
};
var $elm$core$Char$toUpper = _Char_toUpper;
var $author$project$Main$charToText = A2($elm$core$Basics$composeR, $elm$core$Char$toUpper, $elm$core$String$fromChar);
var $author$project$Main$guessDescription = function (lang) {
	return $elm$core$List$map(
		function (letter) {
			return A2(
				$author$project$I18n$translate,
				lang,
				function () {
					switch (letter.$) {
						case 1:
							var c = letter.a;
							return $author$project$I18n$HelpLetterCorrectlyPlaced(
								{
									bg: $author$project$Main$charToText(c)
								});
						case 2:
							var c = letter.a;
							return $author$project$I18n$HelpLetterMisplaced(
								{
									bg: $author$project$Main$charToText(c)
								});
						case 0:
							var c = letter.a;
							return $author$project$I18n$HelpLetterUnused(
								{
									bg: $author$project$Main$charToText(c)
								});
						default:
							var c = letter.a;
							return $author$project$I18n$HelpLetterUnused(
								{
									bg: $author$project$Main$charToText(c)
								});
					}
				}());
		});
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm_explorations$markdown$Markdown$defaultOptions = {
	bR: $elm$core$Maybe$Nothing,
	dk: $elm$core$Maybe$Just(
		{c_: false, ea: false}),
	d2: true,
	d5: false
};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var $elm_explorations$markdown$Markdown$toHtml = $elm_explorations$markdown$Markdown$toHtmlWith($elm_explorations$markdown$Markdown$defaultOptions);
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$Main$viewBoardRow = $elm$html$Html$div(
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('BoardRow'),
			A2(
			$elm$html$Html$Attributes$style,
			'grid-template-columns',
			A2(
				$lukewestby$elm_string_interpolate$String$Interpolate$interpolate,
				'repeat({0}, 1fr)',
				_List_fromArray(
					[
						$elm$core$String$fromInt($author$project$Main$numberOfLetters)
					])))
		]));
var $author$project$Main$viewTile = F2(
	function (classes, _char) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('btn BoardTile rounded-0 ' + classes)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$author$project$Main$charToText(_char))
				]));
	});
var $author$project$Main$viewAttempt = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (letter) {
			switch (letter.$) {
				case 2:
					var _char = letter.a;
					return A2($author$project$Main$viewTile, 'btn-warning', _char);
				case 1:
					var _char = letter.a;
					return A2($author$project$Main$viewTile, 'btn-success', _char);
				case 0:
					var _char = letter.a;
					return A2($author$project$Main$viewTile, 'btn-dark', _char);
				default:
					var _char = letter.a;
					return A2($author$project$Main$viewTile, 'btn-secondary', _char);
			}
		}),
	$author$project$Main$viewBoardRow);
var $author$project$Main$viewHelp = function (_v0) {
	var lang = _v0.ac;
	var demo = _List_fromArray(
		[
			$author$project$Main$Correct('m'),
			$author$project$Main$Misplaced('e'),
			$author$project$Main$Unused('t'),
			$author$project$Main$Correct('a'),
			$author$project$Main$Unused('s')
		]);
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$author$project$I18n$htmlText,
					lang,
					$author$project$I18n$HelpGamePitch(
						{ac: lang, dD: $author$project$Main$maxAttempts, dJ: $author$project$Main$numberOfLetters}))
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2($author$project$I18n$htmlText, lang, $author$project$I18n$HelpKeyboard)
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mb-3')
				]),
			_List_fromArray(
				[
					$author$project$Main$viewAttempt(demo)
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2($author$project$I18n$htmlText, lang, $author$project$I18n$HelpInThisExample)
				])),
			A2(
			$elm$html$Html$ul,
			_List_Nil,
			A2(
				$elm$core$List$map,
				function (line) {
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(line)
							]));
				},
				A2($author$project$Main$guessDescription, lang, demo))),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					A2($author$project$I18n$htmlText, lang, $author$project$I18n$HelpKeyboardLetter)
				])),
			A2(
			$elm_explorations$markdown$Markdown$toHtml,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('Markdown')
				]),
			A2(
				$author$project$I18n$translate,
				lang,
				$author$project$I18n$HelpInspiredBy(
					{dl: 'https://github.com/n1k0/wordlem', ey: 'https://www.powerlanguage.co.uk/wordle/'})))
		]);
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $elm$html$Html$h6 = _VirtualDom_node('h6');
var $author$project$Main$viewModal = F3(
	function (_v0, transationId, content) {
		var lang = _v0.ac;
		var modalContentAttrs = _List_fromArray(
			[
				$elm$html$Html$Attributes$class('modal-content'),
				A2(
				$elm$html$Html$Events$custom,
				'mouseup',
				$elm$json$Json$Decode$succeed(
					{cb: $author$project$Main$NoOp, co: true, cC: true}))
			]);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('d-block')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal d-block fade show'),
							A2($elm$html$Html$Attributes$attribute, 'tabindex', '-1'),
							A2($elm$html$Html$Attributes$attribute, 'aria-modal', 'true'),
							A2($elm$html$Html$Attributes$attribute, 'role', 'dialog'),
							A2(
							$elm$html$Html$Events$custom,
							'mouseup',
							$elm$json$Json$Decode$succeed(
								{cb: $author$project$Main$CloseModal, co: true, cC: true}))
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('modal-dialog modal-dialog-centered modal-dialog-scrollable'),
									A2($elm$html$Html$Attributes$attribute, 'aria-modal', 'true')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									modalContentAttrs,
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-header')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$h6,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('modal-title')
														]),
													_List_fromArray(
														[
															A2($author$project$I18n$htmlText, lang, transationId)
														])),
													A2(
													$elm$html$Html$button,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$type_('button'),
															$elm$html$Html$Attributes$class('btn-close'),
															A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Close'),
															$elm$html$Html$Events$onClick($author$project$Main$CloseModal)
														]),
													_List_Nil)
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('modal-body no-scroll-chaining')
												]),
											content)
										]))
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('modal-backdrop fade show')
						]),
					_List_Nil)
				]));
	});
var $author$project$I18n$StatsLangDataMissing = function (a) {
	return {$: 26, a: a};
};
var $author$project$I18n$StatsAverageGuesses = {$: 19};
var $author$project$I18n$StatsGamesPlayed = function (a) {
	return {$: 21, a: a};
};
var $author$project$I18n$StatsGuessDistribution = function (a) {
	return {$: 22, a: a};
};
var $author$project$I18n$StatsGuessEvolution = function (a) {
	return {$: 23, a: a};
};
var $author$project$I18n$StatsGuessEvolutionHelp = function (a) {
	return {$: 24, a: a};
};
var $author$project$I18n$StatsWinRate = {$: 28};
var $cuducos$elm_format_number$FormatNumber$Locales$Exact = function (a) {
	return {$: 2, a: a};
};
var $cuducos$elm_format_number$FormatNumber$Parser$FormattedNumber = F5(
	function (original, integers, decimals, prefix, suffix) {
		return {c7: decimals, b5: integers, ci: original, aX: prefix, a$: suffix};
	});
var $cuducos$elm_format_number$FormatNumber$Parser$Negative = 2;
var $cuducos$elm_format_number$FormatNumber$Parser$Positive = 0;
var $cuducos$elm_format_number$FormatNumber$Parser$Zero = 1;
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $cuducos$elm_format_number$FormatNumber$Parser$classify = function (formatted) {
	var onlyZeros = A2(
		$elm$core$String$all,
		function (_char) {
			return _char === '0';
		},
		$elm$core$String$concat(
			A2(
				$elm$core$List$append,
				formatted.b5,
				$elm$core$List$singleton(formatted.c7))));
	return onlyZeros ? 1 : ((formatted.ci < 0) ? 2 : 0);
};
var $elm$core$String$filter = _String_filter;
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $cuducos$elm_format_number$FormatNumber$Parser$addZerosToFit = F2(
	function (desiredLength, value) {
		var length = $elm$core$String$length(value);
		var missing = (_Utils_cmp(length, desiredLength) < 0) ? $elm$core$Basics$abs(desiredLength - length) : 0;
		return _Utils_ap(
			value,
			A2($elm$core$String$repeat, missing, '0'));
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $cuducos$elm_format_number$FormatNumber$Parser$removeZeros = function (decimals) {
	return (A2($elm$core$String$right, 1, decimals) !== '0') ? decimals : $cuducos$elm_format_number$FormatNumber$Parser$removeZeros(
		A2($elm$core$String$dropRight, 1, decimals));
};
var $cuducos$elm_format_number$FormatNumber$Parser$getDecimals = F2(
	function (locale, digits) {
		var _v0 = locale.c7;
		switch (_v0.$) {
			case 1:
				return $cuducos$elm_format_number$FormatNumber$Parser$removeZeros(digits);
			case 2:
				return digits;
			default:
				var min = _v0.a;
				return A2($cuducos$elm_format_number$FormatNumber$Parser$addZerosToFit, min, digits);
		}
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (c !== '0') && (c !== '.');
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (head === '9') {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 1) {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				'0',
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3($elm$core$String$padRight, e + 1, '0', total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					'0',
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3($elm$core$String$padRight, s, '0', after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 1) {
				return false;
			} else {
				if ('5' === _v0.a.a) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $cuducos$elm_format_number$FormatNumber$Parser$splitInParts = F2(
	function (locale, value) {
		var toString = function () {
			var _v1 = locale.c7;
			switch (_v1.$) {
				case 1:
					var max = _v1.a;
					return $myrho$elm_round$Round$round(max);
				case 0:
					return $elm$core$String$fromFloat;
				default:
					var exact = _v1.a;
					return $myrho$elm_round$Round$round(exact);
			}
		}();
		var asList = A2(
			$elm$core$String$split,
			'.',
			toString(value));
		var decimals = function () {
			var _v0 = $elm$core$List$tail(asList);
			if (!_v0.$) {
				var values = _v0.a;
				return A2(
					$elm$core$Maybe$withDefault,
					'',
					$elm$core$List$head(values));
			} else {
				return '';
			}
		}();
		var integers = A2(
			$elm$core$Maybe$withDefault,
			'',
			$elm$core$List$head(asList));
		return _Utils_Tuple2(integers, decimals);
	});
var $cuducos$elm_format_number$FormatNumber$Parser$splitByIndian = function (integers) {
	var thousand = ($elm$core$String$length(integers) > 3) ? A2($elm$core$String$right, 3, integers) : integers;
	var reversedSplitHundreds = function (value) {
		return ($elm$core$String$length(value) > 2) ? A2(
			$elm$core$List$cons,
			A2($elm$core$String$right, 2, value),
			reversedSplitHundreds(
				A2($elm$core$String$dropRight, 2, value))) : ((!$elm$core$String$length(value)) ? _List_Nil : _List_fromArray(
			[value]));
	};
	return $elm$core$List$reverse(
		A2(
			$elm$core$List$cons,
			thousand,
			reversedSplitHundreds(
				A2($elm$core$String$dropRight, 3, integers))));
};
var $cuducos$elm_format_number$FormatNumber$Parser$splitByWestern = function (integers) {
	var reversedSplitThousands = function (value) {
		return ($elm$core$String$length(value) > 3) ? A2(
			$elm$core$List$cons,
			A2($elm$core$String$right, 3, value),
			reversedSplitThousands(
				A2($elm$core$String$dropRight, 3, value))) : _List_fromArray(
			[value]);
	};
	return $elm$core$List$reverse(
		reversedSplitThousands(integers));
};
var $cuducos$elm_format_number$FormatNumber$Parser$splitIntegers = F2(
	function (system, integers) {
		if (!system) {
			return $cuducos$elm_format_number$FormatNumber$Parser$splitByWestern(
				A2($elm$core$String$filter, $elm$core$Char$isDigit, integers));
		} else {
			return $cuducos$elm_format_number$FormatNumber$Parser$splitByIndian(
				A2($elm$core$String$filter, $elm$core$Char$isDigit, integers));
		}
	});
var $cuducos$elm_format_number$FormatNumber$Parser$parse = F2(
	function (locale, original) {
		var parts = A2($cuducos$elm_format_number$FormatNumber$Parser$splitInParts, locale, original);
		var integers = A2(
			$cuducos$elm_format_number$FormatNumber$Parser$splitIntegers,
			locale.a0,
			A2($elm$core$String$filter, $elm$core$Char$isDigit, parts.a));
		var decimals = A2($cuducos$elm_format_number$FormatNumber$Parser$getDecimals, locale, parts.b);
		var partial = A5($cuducos$elm_format_number$FormatNumber$Parser$FormattedNumber, original, integers, decimals, '', '');
		var _v0 = $cuducos$elm_format_number$FormatNumber$Parser$classify(partial);
		switch (_v0) {
			case 2:
				return _Utils_update(
					partial,
					{aX: locale.bl, a$: locale.bm});
			case 0:
				return _Utils_update(
					partial,
					{aX: locale.cm, a$: locale.cn});
			default:
				return _Utils_update(
					partial,
					{aX: locale.cQ, a$: locale.cR});
		}
	});
var $cuducos$elm_format_number$FormatNumber$Stringfy$formatDecimals = F2(
	function (locale, decimals) {
		return (decimals === '') ? '' : _Utils_ap(locale.ai, decimals);
	});
var $cuducos$elm_format_number$FormatNumber$Stringfy$stringfy = F2(
	function (locale, formatted) {
		var stringfyDecimals = $cuducos$elm_format_number$FormatNumber$Stringfy$formatDecimals(locale);
		var integers = A2($elm$core$String$join, locale.ae, formatted.b5);
		var decimals = stringfyDecimals(formatted.c7);
		return $elm$core$String$concat(
			_List_fromArray(
				[formatted.aX, integers, decimals, formatted.a$]));
	});
var $cuducos$elm_format_number$FormatNumber$format = F2(
	function (locale, number_) {
		return A2(
			$cuducos$elm_format_number$FormatNumber$Stringfy$stringfy,
			locale,
			A2($cuducos$elm_format_number$FormatNumber$Parser$parse, locale, number_));
	});
var $cuducos$elm_format_number$FormatNumber$Locales$Min = function (a) {
	return {$: 0, a: a};
};
var $cuducos$elm_format_number$FormatNumber$Locales$Western = 0;
var $cuducos$elm_format_number$FormatNumber$Locales$base = {
	ai: '.',
	c7: $cuducos$elm_format_number$FormatNumber$Locales$Min(0),
	bl: '−',
	bm: '',
	cm: '',
	cn: '',
	a0: 0,
	ae: '',
	cQ: '',
	cR: ''
};
var $cuducos$elm_format_number$FormatNumber$Locales$frenchLocale = _Utils_update(
	$cuducos$elm_format_number$FormatNumber$Locales$base,
	{
		ai: ',',
		c7: $cuducos$elm_format_number$FormatNumber$Locales$Exact(3),
		ae: '\u202F'
	});
var $author$project$Main$formatFloat = function (decimals) {
	return $cuducos$elm_format_number$FormatNumber$format(
		_Utils_update(
			$cuducos$elm_format_number$FormatNumber$Locales$frenchLocale,
			{
				c7: $cuducos$elm_format_number$FormatNumber$Locales$Exact(decimals)
			}));
};
var $author$project$Main$formatPercent = function (_float) {
	return A2($author$project$Main$formatFloat, 0, _float) + '%';
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $terezka$elm_charts$Internal$Property$Property = function (a) {
	return {$: 0, a: a};
};
var $terezka$elm_charts$Internal$Property$property = F3(
	function (value, inter, attrs) {
		return $terezka$elm_charts$Internal$Property$Property(
			{
				f: attrs,
				dh: F5(
					function (_v0, _v1, _v2, _v3, _v4) {
						return _List_Nil;
					}),
				K: A2(
					$elm$core$Basics$composeR,
					value,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$map($elm$core$String$fromFloat),
						$elm$core$Maybe$withDefault('N/A'))),
				dw: inter,
				cc: $elm$core$Maybe$Nothing,
				aa: value,
				aK: value
			});
	});
var $terezka$elm_charts$Chart$bar = function (y) {
	return A2(
		$terezka$elm_charts$Internal$Property$property,
		A2($elm$core$Basics$composeR, y, $elm$core$Maybe$Just),
		_List_Nil);
};
var $terezka$elm_charts$Chart$BarsElement = F5(
	function (a, b, c, d, e) {
		return {$: 2, a: a, b: b, c: c, d: d, e: e};
	});
var $terezka$elm_charts$Chart$Indexed = function (a) {
	return {$: 0, a: a};
};
var $terezka$elm_charts$Internal$Many$apply = F2(
	function (_v0, items) {
		var func = _v0.b;
		return func(items);
	});
var $terezka$elm_charts$Chart$Item$apply = $terezka$elm_charts$Internal$Many$apply;
var $terezka$elm_charts$Internal$Helpers$apply = F2(
	function (funcs, _default) {
		var apply_ = F2(
			function (f, a) {
				return f(a);
			});
		return A3($elm$core$List$foldl, apply_, _default, funcs);
	});
var $terezka$elm_charts$Internal$Many$Remodel = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $terezka$elm_charts$Internal$Item$Rendered = $elm$core$Basics$identity;
var $terezka$elm_charts$Internal$Many$editLimits = F2(
	function (edit, _v0) {
		var group_ = _v0;
		return _Utils_update(
			group_,
			{
				ej: function (c) {
					return function (_v1) {
						var x = _v1.a;
						var xs = _v1.b;
						return A2(
							edit,
							x,
							group_.ej(c));
					}(c.O);
				}
			});
	});
var $terezka$elm_charts$Internal$Item$getPosition = F2(
	function (plane, _v0) {
		var item = _v0;
		return A2(item.em, plane, item.c2);
	});
var $terezka$elm_charts$Internal$Item$getX1 = function (_v0) {
	var item = _v0;
	return item.c2.et.aA;
};
var $terezka$elm_charts$Internal$Item$getX2 = function (_v0) {
	var item = _v0;
	return item.c2.et.aL;
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $terezka$elm_charts$Internal$Helpers$gatherWith = F2(
	function (testFn, list) {
		var helper = F2(
			function (scattered, gathered) {
				if (!scattered.b) {
					return $elm$core$List$reverse(gathered);
				} else {
					var toGather = scattered.a;
					var population = scattered.b;
					var _v1 = A2(
						$elm$core$List$partition,
						testFn(toGather),
						population);
					var gathering = _v1.a;
					var remaining = _v1.b;
					return A2(
						helper,
						remaining,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(toGather, gathering),
							gathered));
				}
			});
		return A2(helper, list, _List_Nil);
	});
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $terezka$elm_charts$Internal$Coordinates$Position = F4(
	function (x1, x2, y1, y2) {
		return {aA: x1, aL: x2, eB: y1, bG: y2};
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $terezka$elm_charts$Internal$Coordinates$foldPosition = F2(
	function (func, data) {
		var fold = F2(
			function (datum, posM) {
				if (!posM.$) {
					var pos = posM.a;
					return $elm$core$Maybe$Just(
						{
							aA: A2(
								$elm$core$Basics$min,
								func(datum).aA,
								pos.aA),
							aL: A2(
								$elm$core$Basics$max,
								func(datum).aL,
								pos.aL),
							eB: A2(
								$elm$core$Basics$min,
								func(datum).eB,
								pos.eB),
							bG: A2(
								$elm$core$Basics$max,
								func(datum).bG,
								pos.bG)
						});
				} else {
					return $elm$core$Maybe$Just(
						func(datum));
				}
			});
		return A2(
			$elm$core$Maybe$withDefault,
			A4($terezka$elm_charts$Internal$Coordinates$Position, 0, 0, 0, 0),
			A3($elm$core$List$foldl, fold, $elm$core$Maybe$Nothing, data));
	});
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $terezka$elm_charts$Internal$Item$getLimits = function (_v0) {
	var item = _v0;
	return item.ej(item.c2);
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $terezka$elm_charts$Internal$Item$toHtml = function (_v0) {
	var item = _v0;
	return item.ei(item.c2);
};
var $terezka$elm_charts$Internal$Item$toSvg = F2(
	function (plane, _v0) {
		var item = _v0;
		return A3(
			item.en,
			plane,
			item.c2,
			A2(item.em, plane, item.c2));
	});
var $terezka$elm_charts$Internal$Many$toGroup = F2(
	function (first, rest) {
		var concatTuple = function (_v1) {
			var x = _v1.a;
			var xs = _v1.b;
			return A2($elm$core$List$cons, x, xs);
		};
		return {
			c2: {
				O: _Utils_Tuple2(first, rest)
			},
			ei: function (c) {
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$table,
						_List_Nil,
						A2(
							$elm$core$List$concatMap,
							$terezka$elm_charts$Internal$Item$toHtml,
							concatTuple(c.O)))
					]);
			},
			ej: function (c) {
				return A2(
					$terezka$elm_charts$Internal$Coordinates$foldPosition,
					$terezka$elm_charts$Internal$Item$getLimits,
					concatTuple(c.O));
			},
			em: F2(
				function (p, c) {
					return A2(
						$terezka$elm_charts$Internal$Coordinates$foldPosition,
						$terezka$elm_charts$Internal$Item$getPosition(p),
						concatTuple(c.O));
				}),
			en: F3(
				function (p, c, _v0) {
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('elm-charts__group')
							]),
						A2(
							$elm$core$List$map,
							$terezka$elm_charts$Internal$Item$toSvg(p),
							concatTuple(c.O)));
				})
		};
	});
var $terezka$elm_charts$Internal$Many$groupingHelp = F2(
	function (_v0, items) {
		var shared = _v0.a_;
		var equality = _v0.aR;
		var edits = _v0.aQ;
		var toShared = function (_v2) {
			var item = _v2;
			return shared(item.c2);
		};
		var toNewGroup = function (_v1) {
			var i = _v1.a;
			var is = _v1.b;
			return edits(
				A2($terezka$elm_charts$Internal$Many$toGroup, i, is));
		};
		var toEquality = F2(
			function (aO, bO) {
				return A2(
					equality,
					toShared(aO),
					toShared(bO));
			});
		return A2(
			$elm$core$List$map,
			toNewGroup,
			A2($terezka$elm_charts$Internal$Helpers$gatherWith, toEquality, items));
	});
var $terezka$elm_charts$Internal$Many$bins = A2(
	$terezka$elm_charts$Internal$Many$Remodel,
	$terezka$elm_charts$Internal$Item$getPosition,
	$terezka$elm_charts$Internal$Many$groupingHelp(
		{
			aQ: $terezka$elm_charts$Internal$Many$editLimits(
				F2(
					function (item, pos) {
						return _Utils_update(
							pos,
							{
								aA: $terezka$elm_charts$Internal$Item$getX1(item),
								aL: $terezka$elm_charts$Internal$Item$getX2(item)
							});
					})),
			aR: F2(
				function (a, b) {
					return _Utils_eq(a.aA, b.aA) && (_Utils_eq(a.aL, b.aL) && (_Utils_eq(a.db, b.db) && _Utils_eq(a.a2, b.a2)));
				}),
			a_: function (config) {
				return {a2: config.a1.aP, db: config.a1.db, aA: config.et.aA, aL: config.et.aL};
			}
		}));
var $terezka$elm_charts$Chart$Item$bins = $terezka$elm_charts$Internal$Many$bins;
var $terezka$elm_charts$Internal$Produce$defaultBars = {i: false, dm: true, ak: 0.1, d0: 0, d1: 0, d6: 0.05, aA: $elm$core$Maybe$Nothing, aL: $elm$core$Maybe$Nothing};
var $terezka$elm_charts$Internal$Item$generalize = F2(
	function (toAny, _v0) {
		var item = _v0;
		return {
			c2: {
				dW: toAny(item.c2.dW),
				eh: $elm$core$Basics$identity,
				a1: item.c2.a1,
				et: item.c2.et
			},
			ei: function (c) {
				return $terezka$elm_charts$Internal$Item$toHtml(item);
			},
			ej: function (_v1) {
				return item.ej(item.c2);
			},
			em: F2(
				function (plane, _v2) {
					return A2(item.em, plane, item.c2);
				}),
			en: F3(
				function (plane, _v3, _v4) {
					return A2($terezka$elm_charts$Internal$Item$toSvg, plane, item);
				})
		};
	});
var $terezka$elm_charts$Internal$Many$getMembers = function (_v0) {
	var group_ = _v0;
	return function (_v1) {
		var x = _v1.a;
		var xs = _v1.b;
		return A2($elm$core$List$cons, x, xs);
	}(group_.c2.O);
};
var $terezka$elm_charts$Internal$Many$getGenerals = function (group_) {
	var generalize = function (_v0) {
		var item = _v0;
		return A2($terezka$elm_charts$Internal$Item$generalize, item.c2.eh, item);
	};
	return A2(
		$elm$core$List$map,
		generalize,
		$terezka$elm_charts$Internal$Many$getMembers(group_));
};
var $terezka$elm_charts$Chart$Item$getLimits = $terezka$elm_charts$Internal$Item$getLimits;
var $terezka$elm_charts$Internal$Item$map = F2(
	function (func, _v0) {
		var item = _v0;
		return {
			c2: {
				dW: item.c2.dW,
				eh: item.c2.eh,
				a1: item.c2.a1,
				et: {
					c6: func(item.c2.et.c6),
					dy: item.c2.et.dy,
					aA: item.c2.et.aA,
					aL: item.c2.et.aL,
					cN: item.c2.et.cN
				}
			},
			ei: function (_v1) {
				return $terezka$elm_charts$Internal$Item$toHtml(item);
			},
			ej: function (_v2) {
				return item.ej(item.c2);
			},
			em: F2(
				function (plane, _v3) {
					return A2(item.em, plane, item.c2);
				}),
			en: F3(
				function (plane, _v4, _v5) {
					return A2($terezka$elm_charts$Internal$Item$toSvg, plane, item);
				})
		};
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$svg$Svg$map = $elm$virtual_dom$VirtualDom$map;
var $terezka$elm_charts$Internal$Legend$BarLegend = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $terezka$elm_charts$Chart$Attributes$border = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{A: v});
	});
var $terezka$elm_charts$Chart$Attributes$color = F2(
	function (v, config) {
		return (v === '') ? config : _Utils_update(
			config,
			{b: v});
	});
var $terezka$elm_charts$Internal$Helpers$pink = '#ea60df';
var $terezka$elm_charts$Internal$Svg$defaultBar = {f: _List_Nil, A: 'white', C: 0, b: $terezka$elm_charts$Internal$Helpers$pink, a5: $elm$core$Maybe$Nothing, dq: 0, dr: '', ds: 10, V: 1, d0: 0, d1: 0};
var $terezka$elm_charts$Chart$Attributes$roundBottom = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{d0: v});
	});
var $terezka$elm_charts$Chart$Attributes$roundTop = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{d1: v});
	});
var $terezka$elm_charts$Internal$Property$toConfigs = function (prop) {
	if (!prop.$) {
		var config = prop.a;
		return _List_fromArray(
			[config]);
	} else {
		var configs = prop.a;
		return configs;
	}
};
var $terezka$elm_charts$Internal$Helpers$blue = '#12A5ED';
var $terezka$elm_charts$Internal$Helpers$brown = '#871c1c';
var $terezka$elm_charts$Internal$Helpers$green = '#71c614';
var $terezka$elm_charts$Internal$Helpers$moss = '#92b42c';
var $terezka$elm_charts$Internal$Helpers$orange = '#FF8400';
var $terezka$elm_charts$Internal$Helpers$purple = '#7b4dff';
var $terezka$elm_charts$Internal$Helpers$red = '#F5325B';
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === -2) {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $terezka$elm_charts$Internal$Helpers$toDefault = F3(
	function (_default, items, index) {
		var dict = $elm$core$Dict$fromList(
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, items));
		var numOfItems = $elm$core$Dict$size(dict);
		var itemIndex = index % numOfItems;
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A2($elm$core$Dict$get, itemIndex, dict));
	});
var $terezka$elm_charts$Internal$Helpers$turquoise = '#22d2ba';
var $terezka$elm_charts$Internal$Helpers$yellow = '#FFCA00';
var $terezka$elm_charts$Internal$Helpers$toDefaultColor = A2(
	$terezka$elm_charts$Internal$Helpers$toDefault,
	$terezka$elm_charts$Internal$Helpers$pink,
	_List_fromArray(
		[$terezka$elm_charts$Internal$Helpers$purple, $terezka$elm_charts$Internal$Helpers$pink, $terezka$elm_charts$Internal$Helpers$blue, $terezka$elm_charts$Internal$Helpers$green, $terezka$elm_charts$Internal$Helpers$red, $terezka$elm_charts$Internal$Helpers$yellow, $terezka$elm_charts$Internal$Helpers$turquoise, $terezka$elm_charts$Internal$Helpers$orange, $terezka$elm_charts$Internal$Helpers$moss, $terezka$elm_charts$Internal$Helpers$brown]));
var $terezka$elm_charts$Internal$Legend$toBarLegends = F3(
	function (elIndex, barsAttrs, properties) {
		var toBarConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultBar);
		};
		var barsConfig = A2($terezka$elm_charts$Internal$Helpers$apply, barsAttrs, $terezka$elm_charts$Internal$Produce$defaultBars);
		var toBarLegend = F2(
			function (colorIndex, prop) {
				var rounding = A2($elm$core$Basics$max, barsConfig.d1, barsConfig.d0);
				var defaultName = 'Property #' + $elm$core$String$fromInt(colorIndex + 1);
				var defaultColor = $terezka$elm_charts$Internal$Helpers$toDefaultColor(colorIndex);
				var defaultAttrs = _List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$roundTop(rounding),
						$terezka$elm_charts$Chart$Attributes$roundBottom(rounding),
						$terezka$elm_charts$Chart$Attributes$color(defaultColor),
						$terezka$elm_charts$Chart$Attributes$border(defaultColor)
					]);
				var attrsOrg = _Utils_ap(defaultAttrs, prop.f);
				var productOrg = toBarConfig(attrsOrg);
				var attrs = _Utils_eq(productOrg.A, defaultColor) ? _Utils_ap(
					attrsOrg,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$border(productOrg.b)
						])) : attrsOrg;
				return A2(
					$terezka$elm_charts$Internal$Legend$BarLegend,
					A2($elm$core$Maybe$withDefault, defaultName, prop.cc),
					attrs);
			});
		return A2(
			$elm$core$List$indexedMap,
			function (propIndex) {
				return toBarLegend(elIndex + propIndex);
			},
			A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Property$toConfigs, properties));
	});
var $terezka$elm_charts$Internal$Item$Bar = function (a) {
	return {$: 1, a: a};
};
var $terezka$elm_charts$Internal$Commands$Arc = F7(
	function (a, b, c, d, e, f, g) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e, f: f, g: g};
	});
var $terezka$elm_charts$Internal$Commands$Line = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $terezka$elm_charts$Internal$Commands$Move = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $terezka$elm_charts$Internal$Commands$joinCommands = function (commands) {
	return A2($elm$core$String$join, ' ', commands);
};
var $terezka$elm_charts$Internal$Commands$stringBoolInt = function (bool) {
	return bool ? '1' : '0';
};
var $terezka$elm_charts$Internal$Commands$stringPoint = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return $elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y));
};
var $terezka$elm_charts$Internal$Commands$stringPoints = function (points) {
	return A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $terezka$elm_charts$Internal$Commands$stringPoint, points));
};
var $terezka$elm_charts$Internal$Commands$stringCommand = function (command) {
	switch (command.$) {
		case 0:
			var x = command.a;
			var y = command.b;
			return 'M' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 1:
			var x = command.a;
			var y = command.b;
			return 'L' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 2:
			var cx1 = command.a;
			var cy1 = command.b;
			var cx2 = command.c;
			var cy2 = command.d;
			var x = command.e;
			var y = command.f;
			return 'C' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(cx2, cy2),
						_Utils_Tuple2(x, y)
					]));
		case 3:
			var cx1 = command.a;
			var cy1 = command.b;
			var x = command.c;
			var y = command.d;
			return 'Q' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(x, y)
					]));
		case 4:
			var cx1 = command.a;
			var cy1 = command.b;
			var x = command.c;
			var y = command.d;
			return 'Q' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(x, y)
					]));
		case 5:
			var x = command.a;
			var y = command.b;
			return 'T' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 6:
			var rx = command.a;
			var ry = command.b;
			var xAxisRotation = command.c;
			var largeArcFlag = command.d;
			var sweepFlag = command.e;
			var x = command.f;
			var y = command.g;
			return 'A ' + $terezka$elm_charts$Internal$Commands$joinCommands(
				_List_fromArray(
					[
						$terezka$elm_charts$Internal$Commands$stringPoint(
						_Utils_Tuple2(rx, ry)),
						$elm$core$String$fromInt(xAxisRotation),
						$terezka$elm_charts$Internal$Commands$stringBoolInt(largeArcFlag),
						$terezka$elm_charts$Internal$Commands$stringBoolInt(sweepFlag),
						$terezka$elm_charts$Internal$Commands$stringPoint(
						_Utils_Tuple2(x, y))
					]));
		default:
			return 'Z';
	}
};
var $terezka$elm_charts$Internal$Commands$Close = {$: 7};
var $terezka$elm_charts$Internal$Commands$CubicBeziers = F6(
	function (a, b, c, d, e, f) {
		return {$: 2, a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $terezka$elm_charts$Internal$Commands$CubicBeziersShort = F4(
	function (a, b, c, d) {
		return {$: 3, a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Commands$QuadraticBeziers = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Commands$QuadraticBeziersShort = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $terezka$elm_charts$Internal$Coordinates$innerLength = function (axis) {
	return A2($elm$core$Basics$max, 1, (axis.dA - axis.dC) - axis.dB);
};
var $terezka$elm_charts$Internal$Coordinates$innerWidth = function (plane) {
	return $terezka$elm_charts$Internal$Coordinates$innerLength(plane.cM);
};
var $terezka$elm_charts$Internal$Coordinates$range = function (axis) {
	var diff = axis.D - axis.P;
	return (diff > 0) ? diff : 1;
};
var $terezka$elm_charts$Internal$Coordinates$scaleSVGX = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$innerWidth(plane)) / $terezka$elm_charts$Internal$Coordinates$range(plane.cM);
	});
var $terezka$elm_charts$Internal$Coordinates$toSVGX = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, value - plane.cM.P) + plane.cM.dC;
	});
var $terezka$elm_charts$Internal$Coordinates$innerHeight = function (plane) {
	return $terezka$elm_charts$Internal$Coordinates$innerLength(plane.cN);
};
var $terezka$elm_charts$Internal$Coordinates$scaleSVGY = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$innerHeight(plane)) / $terezka$elm_charts$Internal$Coordinates$range(plane.cN);
	});
var $terezka$elm_charts$Internal$Coordinates$toSVGY = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleSVGY, plane, plane.cN.D - value) + plane.cN.dC;
	});
var $terezka$elm_charts$Internal$Commands$translate = F2(
	function (plane, command) {
		switch (command.$) {
			case 0:
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$Move,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 1:
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$Line,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 2:
				var cx1 = command.a;
				var cy1 = command.b;
				var cx2 = command.c;
				var cy2 = command.d;
				var x = command.e;
				var y = command.f;
				return A6(
					$terezka$elm_charts$Internal$Commands$CubicBeziers,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx2),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy2),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 3:
				var cx1 = command.a;
				var cy1 = command.b;
				var x = command.c;
				var y = command.d;
				return A4(
					$terezka$elm_charts$Internal$Commands$CubicBeziersShort,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 4:
				var cx1 = command.a;
				var cy1 = command.b;
				var x = command.c;
				var y = command.d;
				return A4(
					$terezka$elm_charts$Internal$Commands$QuadraticBeziers,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 5:
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$QuadraticBeziersShort,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 6:
				var rx = command.a;
				var ry = command.b;
				var xAxisRotation = command.c;
				var largeArcFlag = command.d;
				var sweepFlag = command.e;
				var x = command.f;
				var y = command.g;
				return A7(
					$terezka$elm_charts$Internal$Commands$Arc,
					rx,
					ry,
					xAxisRotation,
					largeArcFlag,
					sweepFlag,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			default:
				return $terezka$elm_charts$Internal$Commands$Close;
		}
	});
var $terezka$elm_charts$Internal$Commands$description = F2(
	function (plane, commands) {
		return $terezka$elm_charts$Internal$Commands$joinCommands(
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeR,
					$terezka$elm_charts$Internal$Commands$translate(plane),
					$terezka$elm_charts$Internal$Commands$stringCommand),
				commands));
	});
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $terezka$elm_charts$Internal$Coordinates$scaleCartesianX = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$range(plane.cM)) / $terezka$elm_charts$Internal$Coordinates$innerWidth(plane);
	});
var $terezka$elm_charts$Internal$Coordinates$scaleCartesianY = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$range(plane.cN)) / $terezka$elm_charts$Internal$Coordinates$innerHeight(plane);
	});
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $terezka$elm_charts$Internal$Svg$apply = F2(
	function (funcs, _default) {
		var apply_ = F2(
			function (f, a) {
				return f(a);
			});
		return A3($elm$core$List$foldl, apply_, _default, funcs);
	});
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$linearGradient = $elm$svg$Svg$trustedNode('linearGradient');
var $elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var $elm$svg$Svg$pattern = $elm$svg$Svg$trustedNode('pattern');
var $elm$svg$Svg$Attributes$patternTransform = _VirtualDom_attribute('patternTransform');
var $elm$svg$Svg$Attributes$patternUnits = _VirtualDom_attribute('patternUnits');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$svg$Svg$stop = $elm$svg$Svg$trustedNode('stop');
var $elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $terezka$elm_charts$Internal$Svg$toPattern = F2(
	function (defaultColor, design) {
		var toPatternId = function (props) {
			return A3(
				$elm$core$String$replace,
				'(',
				'-',
				A3(
					$elm$core$String$replace,
					')',
					'-',
					A3(
						$elm$core$String$replace,
						'.',
						'-',
						A3(
							$elm$core$String$replace,
							',',
							'-',
							A3(
								$elm$core$String$replace,
								' ',
								'-',
								A2(
									$elm$core$String$join,
									'-',
									_Utils_ap(
										_List_fromArray(
											[
												'elm-charts__pattern',
												function () {
												switch (design.$) {
													case 0:
														return 'striped';
													case 1:
														return 'dotted';
													default:
														return 'gradient';
												}
											}()
											]),
										props)))))));
		};
		var toPatternDefs = F4(
			function (id, spacing, rotate, inside) {
				return A2(
					$elm$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$pattern,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id(id),
									$elm$svg$Svg$Attributes$patternUnits('userSpaceOnUse'),
									$elm$svg$Svg$Attributes$width(
									$elm$core$String$fromFloat(spacing)),
									$elm$svg$Svg$Attributes$height(
									$elm$core$String$fromFloat(spacing)),
									$elm$svg$Svg$Attributes$patternTransform(
									'rotate(' + ($elm$core$String$fromFloat(rotate) + ')'))
								]),
							_List_fromArray(
								[inside]))
						]));
			});
		var _v0 = function () {
			switch (design.$) {
				case 0:
					var edits = design.a;
					var config = A2(
						$terezka$elm_charts$Internal$Svg$apply,
						edits,
						{b: defaultColor, r: 45, d6: 4, cL: 3});
					var theId = toPatternId(
						_List_fromArray(
							[
								config.b,
								$elm$core$String$fromFloat(config.cL),
								$elm$core$String$fromFloat(config.d6),
								$elm$core$String$fromFloat(config.r)
							]));
					return _Utils_Tuple2(
						A4(
							toPatternDefs,
							theId,
							config.d6,
							config.r,
							A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1('0'),
										$elm$svg$Svg$Attributes$y('0'),
										$elm$svg$Svg$Attributes$x2('0'),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(config.d6)),
										$elm$svg$Svg$Attributes$stroke(config.b),
										$elm$svg$Svg$Attributes$strokeWidth(
										$elm$core$String$fromFloat(config.cL))
									]),
								_List_Nil)),
						theId);
				case 1:
					var edits = design.a;
					var config = A2(
						$terezka$elm_charts$Internal$Svg$apply,
						edits,
						{b: defaultColor, r: 45, d6: 4, cL: 3});
					var theId = toPatternId(
						_List_fromArray(
							[
								config.b,
								$elm$core$String$fromFloat(config.cL),
								$elm$core$String$fromFloat(config.d6),
								$elm$core$String$fromFloat(config.r)
							]));
					return _Utils_Tuple2(
						A4(
							toPatternDefs,
							theId,
							config.d6,
							config.r,
							A2(
								$elm$svg$Svg$circle,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$fill(config.b),
										$elm$svg$Svg$Attributes$cx(
										$elm$core$String$fromFloat(config.cL / 3)),
										$elm$svg$Svg$Attributes$cy(
										$elm$core$String$fromFloat(config.cL / 3)),
										$elm$svg$Svg$Attributes$r(
										$elm$core$String$fromFloat(config.cL / 3))
									]),
								_List_Nil)),
						theId);
				default:
					var edits = design.a;
					var colors = _Utils_eq(edits, _List_Nil) ? _List_fromArray(
						[defaultColor, 'white']) : edits;
					var theId = toPatternId(colors);
					var totalColors = $elm$core$List$length(colors);
					var toPercentage = function (i) {
						return (i * 100) / (totalColors - 1);
					};
					var toStop = F2(
						function (i, c) {
							return A2(
								$elm$svg$Svg$stop,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$offset(
										$elm$core$String$fromFloat(
											toPercentage(i)) + '%'),
										$elm$svg$Svg$Attributes$stopColor(c)
									]),
								_List_Nil);
						});
					return _Utils_Tuple2(
						A2(
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$linearGradient,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$id(theId),
											$elm$svg$Svg$Attributes$x1('0'),
											$elm$svg$Svg$Attributes$x2('0'),
											$elm$svg$Svg$Attributes$y1('0'),
											$elm$svg$Svg$Attributes$y2('1')
										]),
									A2($elm$core$List$indexedMap, toStop, colors))
								])),
						theId);
			}
		}();
		var patternDefs = _v0.a;
		var patternId = _v0.b;
		return _Utils_Tuple2(patternDefs, 'url(#' + (patternId + ')'));
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $elm$html$Html$Attributes$map = $elm$virtual_dom$VirtualDom$mapAttribute;
var $terezka$elm_charts$Internal$Svg$withAttrs = F3(
	function (attrs, toEl, defaultAttrs) {
		return toEl(
			_Utils_ap(
				defaultAttrs,
				A2(
					$elm$core$List$map,
					$elm$html$Html$Attributes$map($elm$core$Basics$never),
					attrs)));
	});
var $elm$svg$Svg$Attributes$clipPath = _VirtualDom_attribute('clip-path');
var $terezka$elm_charts$Internal$Coordinates$toId = function (plane) {
	var numToStr = A2(
		$elm$core$Basics$composeR,
		$elm$core$String$fromFloat,
		A2($elm$core$String$replace, '.', '-'));
	return A2(
		$elm$core$String$join,
		'_',
		_List_fromArray(
			[
				'elm-charts__id',
				numToStr(plane.cM.dA),
				numToStr(plane.cM.P),
				numToStr(plane.cM.D),
				numToStr(plane.cM.dC),
				numToStr(plane.cM.dB),
				numToStr(plane.cN.dA),
				numToStr(plane.cN.P),
				numToStr(plane.cN.D),
				numToStr(plane.cN.dC),
				numToStr(plane.cN.dB)
			]));
};
var $terezka$elm_charts$Internal$Svg$withinChartArea = function (plane) {
	return $elm$svg$Svg$Attributes$clipPath(
		'url(#' + ($terezka$elm_charts$Internal$Coordinates$toId(plane) + ')'));
};
var $terezka$elm_charts$Internal$Svg$bar = F3(
	function (plane, config, point) {
		var viewBar = F6(
			function (fill, fillOpacity, border, borderWidth, strokeOpacity, cmds) {
				return A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.f,
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__bar'),
							$elm$svg$Svg$Attributes$fill(fill),
							$elm$svg$Svg$Attributes$fillOpacity(
							$elm$core$String$fromFloat(fillOpacity)),
							$elm$svg$Svg$Attributes$stroke(border),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromFloat(borderWidth)),
							$elm$svg$Svg$Attributes$strokeOpacity(
							$elm$core$String$fromFloat(strokeOpacity)),
							$elm$svg$Svg$Attributes$d(
							A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_Nil);
			});
		var highlightColor = (config.dr === '') ? config.b : config.dr;
		var borderWidthCarY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, config.C / 2);
		var highlightWidthCarY = borderWidthCarY + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, config.ds / 2);
		var borderWidthCarX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, config.C / 2);
		var highlightWidthCarX = borderWidthCarX + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, config.ds / 2);
		var pos = {
			aA: A2($elm$core$Basics$min, point.aA, point.aL) + borderWidthCarX,
			aL: A2($elm$core$Basics$max, point.aA, point.aL) - borderWidthCarX,
			eB: A2($elm$core$Basics$min, point.eB, point.bG) + borderWidthCarY,
			bG: A2($elm$core$Basics$max, point.eB, point.bG) - borderWidthCarY
		};
		var height = $elm$core$Basics$abs(pos.bG - pos.eB);
		var highlightPos = {aA: pos.aA - highlightWidthCarX, aL: pos.aL + highlightWidthCarX, eB: pos.eB - highlightWidthCarY, bG: pos.bG + highlightWidthCarY};
		var width = $elm$core$Basics$abs(pos.aL - pos.aA);
		var roundingBottom = (A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, width) * 0.5) * A3($elm$core$Basics$clamp, 0, 1, config.d0);
		var radiusBottomX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, roundingBottom);
		var radiusBottomY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, roundingBottom);
		var roundingTop = (A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, width) * 0.5) * A3($elm$core$Basics$clamp, 0, 1, config.d1);
		var radiusTopX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, roundingTop);
		var radiusTopY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, roundingTop);
		var _v0 = ((((height - (radiusTopY * 0.8)) - (radiusBottomY * 0.8)) <= 0) || (((width - (radiusTopX * 0.8)) - (radiusBottomX * 0.8)) <= 0)) ? _Utils_Tuple2(0, 0) : _Utils_Tuple2(config.d1, config.d0);
		var roundTop = _v0.a;
		var roundBottom = _v0.b;
		var _v1 = function () {
			if (_Utils_eq(pos.eB, pos.bG)) {
				return _Utils_Tuple2(_List_Nil, _List_Nil);
			} else {
				var _v2 = _Utils_Tuple2(roundTop > 0, roundBottom > 0);
				if (!_v2.a) {
					if (!_v2.b) {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.aA, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.eB)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.aA, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aA, highlightPos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL, highlightPos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.eB)
								]));
					} else {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.aA + radiusBottomX, pos.eB),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.aA, pos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.aL - radiusBottomX, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA + radiusBottomX, pos.eB)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.aA + radiusBottomX, highlightPos.eB),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.aA, highlightPos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aA, highlightPos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL, highlightPos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL, highlightPos.eB + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.aL - radiusBottomX, highlightPos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aA + radiusBottomX, highlightPos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL - radiusBottomX, pos.eB),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, false, pos.aL, pos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB)
								]));
					}
				} else {
					if (!_v2.b) {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.aA, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.bG - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.aA + radiusTopX, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL - radiusTopX, pos.bG),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.aL, pos.bG - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.eB)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.aA, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aA, highlightPos.bG - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.aA + radiusTopX, highlightPos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL - radiusTopX, highlightPos.bG),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.aL, highlightPos.bG - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.bG - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.aL - radiusTopX, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA + radiusTopX, pos.bG),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.aA, pos.bG - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.eB)
								]));
					} else {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.aA + radiusBottomX, pos.eB),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.aA, pos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.bG - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.aA + radiusTopX, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL - radiusTopX, pos.bG),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.aL, pos.bG - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.aL - radiusBottomX, pos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA + radiusBottomX, pos.eB)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.aA + radiusBottomX, highlightPos.eB),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.aA, highlightPos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aA, highlightPos.bG - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.aA + radiusTopX, highlightPos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL - radiusTopX, highlightPos.bG),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.aL, highlightPos.bG - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aL, highlightPos.eB + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.aL - radiusBottomX, highlightPos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.aA + radiusBottomX, highlightPos.eB),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL - radiusBottomX, pos.eB),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, false, pos.aL, pos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.bG - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.aL - radiusTopX, pos.bG),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA + radiusTopX, pos.bG),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.aA, pos.bG - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aA, pos.eB + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.aL, pos.eB)
								]));
					}
				}
			}
		}();
		var commands = _v1.a;
		var highlightCommands = _v1.b;
		var viewAuraBar = function (fill) {
			return (!config.dq) ? A6(viewBar, fill, config.V, config.A, config.C, 1, commands) : A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__bar-with-highlight')
					]),
				_List_fromArray(
					[
						A6(viewBar, highlightColor, config.dq, 'transparent', 0, 0, highlightCommands),
						A6(viewBar, fill, config.V, config.A, config.C, 1, commands)
					]));
		};
		var _v3 = config.a5;
		if (_v3.$ === 1) {
			return viewAuraBar(config.b);
		} else {
			var design = _v3.a;
			var _v4 = A2($terezka$elm_charts$Internal$Svg$toPattern, config.b, design);
			var patternDefs = _v4.a;
			var fill = _v4.b;
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__bar-with-pattern')
					]),
				_List_fromArray(
					[
						patternDefs,
						viewAuraBar(fill)
					]));
		}
	});
var $terezka$elm_charts$Internal$Produce$toDefaultName = F2(
	function (index, name) {
		return A2(
			$elm$core$Maybe$withDefault,
			'Property #' + $elm$core$String$fromInt(index + 1),
			name);
	});
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $terezka$elm_charts$Internal$Produce$tooltipRow = F3(
	function (color, title, text) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', color),
							A2($elm$html$Html$Attributes$style, 'padding', '0'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '3px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title + ':')
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2($elm$html$Html$Attributes$style, 'padding', '0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(text)
						]))
				]));
	});
var $terezka$elm_charts$Internal$Helpers$withSurround = F2(
	function (all, func) {
		var fold = F4(
			function (index, prev, acc, list) {
				fold:
				while (true) {
					if (list.b) {
						if (list.b.b) {
							var a = list.a;
							var _v1 = list.b;
							var b = _v1.a;
							var rest = _v1.b;
							var $temp$index = index + 1,
								$temp$prev = $elm$core$Maybe$Just(a),
								$temp$acc = _Utils_ap(
								acc,
								_List_fromArray(
									[
										A4(
										func,
										index,
										prev,
										a,
										$elm$core$Maybe$Just(b))
									])),
								$temp$list = A2($elm$core$List$cons, b, rest);
							index = $temp$index;
							prev = $temp$prev;
							acc = $temp$acc;
							list = $temp$list;
							continue fold;
						} else {
							var a = list.a;
							return _Utils_ap(
								acc,
								_List_fromArray(
									[
										A4(func, index, prev, a, $elm$core$Maybe$Nothing)
									]));
						}
					} else {
						return acc;
					}
				}
			});
		return A4(fold, 0, $elm$core$Maybe$Nothing, _List_Nil, all);
	});
var $terezka$elm_charts$Internal$Produce$toBarSeries = F4(
	function (elIndex, barsAttrs, properties, data) {
		var toBarConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultBar);
		};
		var barsConfig = A2($terezka$elm_charts$Internal$Helpers$apply, barsAttrs, $terezka$elm_charts$Internal$Produce$defaultBars);
		var toBarItem = F7(
			function (sections, barIndex, sectionIndex, section, colorIndex, dataIndex, bin) {
				var visual = section.aK(bin.c6);
				var value = section.aa(bin.c6);
				var start = bin.bB;
				var numOfSections = $elm$core$List$length(sections);
				var numOfBars = barsConfig.dm ? $elm$core$List$length(properties) : 1;
				var minY = (numOfSections > 1) ? $elm$core$Basics$max(0) : $elm$core$Basics$identity;
				var y1 = minY(
					A2($elm$core$Maybe$withDefault, 0, visual) - A2($elm$core$Maybe$withDefault, 0, value));
				var y2 = minY(
					A2($elm$core$Maybe$withDefault, 0, visual));
				var isSingle = numOfSections === 1;
				var isLast = _Utils_eq(sectionIndex, numOfSections - 1);
				var roundTop = (isSingle || isLast) ? barsConfig.d1 : 0;
				var isFirst = !sectionIndex;
				var roundBottom = (isSingle || isFirst) ? barsConfig.d0 : 0;
				var end = bin.bS;
				var length = end - start;
				var margin = length * barsConfig.ak;
				var spacing = length * barsConfig.d6;
				var width = ((length - (margin * 2)) - ((numOfBars - 1) * spacing)) / numOfBars;
				var offset = barsConfig.dm ? ((barIndex * width) + (barIndex * spacing)) : 0;
				var x1 = (start + margin) + offset;
				var x2 = ((start + margin) + offset) + width;
				var defaultColor = $terezka$elm_charts$Internal$Helpers$toDefaultColor(colorIndex);
				var defaultAttrs = _List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$roundTop(roundTop),
						$terezka$elm_charts$Chart$Attributes$roundBottom(roundBottom),
						$terezka$elm_charts$Chart$Attributes$color(defaultColor),
						$terezka$elm_charts$Chart$Attributes$border(defaultColor)
					]);
				var attrs = _Utils_ap(
					defaultAttrs,
					_Utils_ap(
						section.f,
						A5(section.dh, barIndex, sectionIndex, dataIndex, section.cc, bin.c6)));
				var productOrg = toBarConfig(attrs);
				var product = function (p) {
					return _Utils_eq(p.A, defaultColor) ? _Utils_update(
						p,
						{A: p.b}) : p;
				}(
					function (p) {
						var _v21 = p.a5;
						if (((!_v21.$) && (_v21.a.$ === 2)) && _v21.a.a.b) {
							var _v22 = _v21.a.a;
							var color = _v22.a;
							return _Utils_eq(p.b, defaultColor) ? _Utils_update(
								p,
								{b: color}) : p;
						} else {
							return p;
						}
					}(productOrg));
				return {
					c2: {
						dW: product,
						eh: $terezka$elm_charts$Internal$Item$Bar,
						a1: {
							A: product.A,
							C: product.C,
							b: product.b,
							aP: dataIndex,
							db: elIndex,
							bX: section.K(bin.c6),
							du: colorIndex,
							dH: section.cc,
							dX: barIndex,
							d7: sectionIndex
						},
						et: {
							c6: bin.c6,
							dy: function () {
								if (!value.$) {
									return true;
								} else {
									return false;
								}
							}(),
							aA: start,
							aL: end,
							cN: A2($elm$core$Maybe$withDefault, 0, value)
						}
					},
					ei: function (c) {
						return _List_fromArray(
							[
								A3(
								$terezka$elm_charts$Internal$Produce$tooltipRow,
								c.a1.b,
								A2($terezka$elm_charts$Internal$Produce$toDefaultName, colorIndex, c.a1.dH),
								section.K(bin.c6))
							]);
					},
					ej: function (config) {
						return {
							aA: x1,
							aL: x2,
							eB: A2($elm$core$Basics$min, y1, y2),
							bG: A2($elm$core$Basics$max, y1, y2)
						};
					},
					em: F2(
						function (_v20, config) {
							return {aA: x1, aL: x2, eB: y1, bG: y2};
						}),
					en: F3(
						function (plane, config, position) {
							return A3($terezka$elm_charts$Internal$Svg$bar, plane, product, position);
						})
				};
			});
		var toSeriesItem = F6(
			function (bins, sections, barIndex, sectionIndex, section, colorIndex) {
				var _v13 = A2(
					$elm$core$List$indexedMap,
					A5(toBarItem, sections, barIndex, sectionIndex, section, colorIndex),
					bins);
				if (!_v13.b) {
					return $elm$core$Maybe$Nothing;
				} else {
					var first = _v13.a;
					var rest = _v13.b;
					return $elm$core$Maybe$Just(
						{
							c2: {
								O: _Utils_Tuple2(first, rest)
							},
							ei: function (c) {
								return _List_fromArray(
									[
										A2(
										$elm$html$Html$table,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'margin', '0')
											]),
										A2(
											$elm$core$List$concatMap,
											$terezka$elm_charts$Internal$Item$toHtml,
											function (_v14) {
												var x = _v14.a;
												var xs = _v14.b;
												return A2($elm$core$List$cons, x, xs);
											}(c.O)))
									]);
							},
							ej: function (c) {
								return A2(
									$terezka$elm_charts$Internal$Coordinates$foldPosition,
									$terezka$elm_charts$Internal$Item$getLimits,
									function (_v15) {
										var x = _v15.a;
										var xs = _v15.b;
										return A2($elm$core$List$cons, x, xs);
									}(c.O));
							},
							em: F2(
								function (plane, c) {
									return A2(
										$terezka$elm_charts$Internal$Coordinates$foldPosition,
										$terezka$elm_charts$Internal$Item$getPosition(plane),
										function (_v16) {
											var x = _v16.a;
											var xs = _v16.b;
											return A2($elm$core$List$cons, x, xs);
										}(c.O));
								}),
							en: F3(
								function (plane, c, _v17) {
									return A2(
										$elm$svg$Svg$g,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$class('elm-charts__bar-series')
											]),
										A2(
											$elm$core$List$map,
											$terezka$elm_charts$Internal$Item$toSvg(plane),
											function (_v18) {
												var x = _v18.a;
												var xs = _v18.b;
												return A2($elm$core$List$cons, x, xs);
											}(c.O)));
								})
						});
				}
			});
		var toBin = F4(
			function (index, prevM, curr, nextM) {
				var _v0 = _Utils_Tuple2(barsConfig.aA, barsConfig.aL);
				if (_v0.a.$ === 1) {
					if (_v0.b.$ === 1) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return {c6: curr, bS: (index + 1) + 0.5, bB: (index + 1) - 0.5};
					} else {
						var _v8 = _v0.a;
						var toEnd = _v0.b.a;
						var _v9 = _Utils_Tuple2(prevM, nextM);
						if (!_v9.a.$) {
							var prev = _v9.a.a;
							return {
								c6: curr,
								bS: toEnd(curr),
								bB: toEnd(prev)
							};
						} else {
							if (!_v9.b.$) {
								var _v10 = _v9.a;
								var next = _v9.b.a;
								return {
									c6: curr,
									bS: toEnd(curr),
									bB: toEnd(curr) - (toEnd(next) - toEnd(curr))
								};
							} else {
								var _v11 = _v9.a;
								var _v12 = _v9.b;
								return {
									c6: curr,
									bS: toEnd(curr),
									bB: toEnd(curr) - 1
								};
							}
						}
					}
				} else {
					if (_v0.b.$ === 1) {
						var toStart = _v0.a.a;
						var _v3 = _v0.b;
						var _v4 = _Utils_Tuple2(prevM, nextM);
						if (!_v4.b.$) {
							var next = _v4.b.a;
							return {
								c6: curr,
								bS: toStart(next),
								bB: toStart(curr)
							};
						} else {
							if (!_v4.a.$) {
								var prev = _v4.a.a;
								var _v5 = _v4.b;
								return {
									c6: curr,
									bS: toStart(curr) + (toStart(curr) - toStart(prev)),
									bB: toStart(curr)
								};
							} else {
								var _v6 = _v4.a;
								var _v7 = _v4.b;
								return {
									c6: curr,
									bS: toStart(curr) + 1,
									bB: toStart(curr)
								};
							}
						}
					} else {
						var toStart = _v0.a.a;
						var toEnd = _v0.b.a;
						return {
							c6: curr,
							bS: toEnd(curr),
							bB: toStart(curr)
						};
					}
				}
			});
		return function (bins) {
			return A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (propIndex, f) {
							return f(elIndex + propIndex);
						}),
					$elm$core$List$concat(
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (barIndex, stacks) {
									return A2(
										$elm$core$List$indexedMap,
										A3(toSeriesItem, bins, stacks, barIndex),
										$elm$core$List$reverse(stacks));
								}),
							A2($elm$core$List$map, $terezka$elm_charts$Internal$Property$toConfigs, properties)))));
		}(
			A2($terezka$elm_charts$Internal$Helpers$withSurround, data, toBin));
	});
var $terezka$elm_charts$Chart$barsMap = F4(
	function (mapData, edits, properties, data) {
		return $terezka$elm_charts$Chart$Indexed(
			function (index) {
				var legends_ = A3($terezka$elm_charts$Internal$Legend$toBarLegends, index, edits, properties);
				var items = A4($terezka$elm_charts$Internal$Produce$toBarSeries, index, edits, properties, data);
				var generalized = A2(
					$elm$core$List$map,
					$terezka$elm_charts$Internal$Item$map(mapData),
					A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Many$getGenerals, items));
				var bins = A2($terezka$elm_charts$Chart$Item$apply, $terezka$elm_charts$Chart$Item$bins, generalized);
				var toLimits = A2($elm$core$List$map, $terezka$elm_charts$Internal$Item$getLimits, bins);
				var barsConfig = A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Produce$defaultBars);
				var toTicks = F2(
					function (plane, acc) {
						return _Utils_update(
							acc,
							{
								G: _Utils_ap(
									acc.G,
									barsConfig.i ? A2(
										$elm$core$List$concatMap,
										A2(
											$elm$core$Basics$composeR,
											$terezka$elm_charts$Chart$Item$getLimits,
											function (pos) {
												return _List_fromArray(
													[pos.aA, pos.aL]);
											}),
										bins) : _List_Nil)
							});
					});
				return _Utils_Tuple2(
					A5(
						$terezka$elm_charts$Chart$BarsElement,
						toLimits,
						generalized,
						legends_,
						toTicks,
						function (plane) {
							return A2(
								$elm$svg$Svg$map,
								$elm$core$Basics$never,
								A2(
									$elm$svg$Svg$g,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$class('elm-charts__bar-series')
										]),
									A2(
										$elm$core$List$map,
										$terezka$elm_charts$Internal$Item$toSvg(plane),
										items)));
						}),
					index + $elm$core$List$length(
						A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Property$toConfigs, properties)));
			});
	});
var $terezka$elm_charts$Chart$bars = F3(
	function (edits, properties, data) {
		return A4($terezka$elm_charts$Chart$barsMap, $elm$core$Basics$identity, edits, properties, data);
	});
var $terezka$elm_charts$Chart$Attributes$blue = $terezka$elm_charts$Internal$Helpers$blue;
var $terezka$elm_charts$Internal$Svg$Event = F2(
	function (name, handler) {
		return {b$: handler, dH: name};
	});
var $elm$svg$Svg$clipPath = $elm$svg$Svg$trustedNode('clipPath');
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $debois$elm_dom$DOM$offsetHeight = A2($elm$json$Json$Decode$field, 'offsetHeight', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetWidth = A2($elm$json$Json$Decode$field, 'offsetWidth', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$map4 = _Json_map4;
var $debois$elm_dom$DOM$offsetLeft = A2($elm$json$Json$Decode$field, 'offsetLeft', $elm$json$Json$Decode$float);
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'offsetParent',
					$elm$json$Json$Decode$null(x)),
					A2($elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var $debois$elm_dom$DOM$offsetTop = A2($elm$json$Json$Decode$field, 'offsetTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollLeft = A2($elm$json$Json$Decode$field, 'scrollLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollTop = A2($elm$json$Json$Decode$field, 'scrollTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (_v0) {
				var x_ = _v0.a;
				var y_ = _v0.b;
				return A2(
					$debois$elm_dom$DOM$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2($debois$elm_dom$DOM$position, x_, y_));
			},
			A5(
				$elm$json$Json$Decode$map4,
				F4(
					function (scrollLeftP, scrollTopP, offsetLeftP, offsetTopP) {
						return _Utils_Tuple2((x + offsetLeftP) - scrollLeftP, (y + offsetTopP) - scrollTopP);
					}),
				$debois$elm_dom$DOM$scrollLeft,
				$debois$elm_dom$DOM$scrollTop,
				$debois$elm_dom$DOM$offsetLeft,
				$debois$elm_dom$DOM$offsetTop));
	});
var $debois$elm_dom$DOM$boundingClientRect = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (_v0, width, height) {
			var x = _v0.a;
			var y = _v0.b;
			return {$7: height, dz: x, eq: y, cL: width};
		}),
	A2($debois$elm_dom$DOM$position, 0, 0),
	$debois$elm_dom$DOM$offsetWidth,
	$debois$elm_dom$DOM$offsetHeight);
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(0));
};
var $debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'parentElement', decoder);
};
function $terezka$elm_charts$Internal$Svg$cyclic$decodePosition() {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$debois$elm_dom$DOM$boundingClientRect,
				$elm$json$Json$Decode$lazy(
				function (_v0) {
					return $debois$elm_dom$DOM$parentElement(
						$terezka$elm_charts$Internal$Svg$cyclic$decodePosition());
				})
			]));
}
var $terezka$elm_charts$Internal$Svg$decodePosition = $terezka$elm_charts$Internal$Svg$cyclic$decodePosition();
$terezka$elm_charts$Internal$Svg$cyclic$decodePosition = function () {
	return $terezka$elm_charts$Internal$Svg$decodePosition;
};
var $terezka$elm_charts$Internal$Coordinates$toCartesianX = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, value - plane.cM.dC) + plane.cM.P;
	});
var $terezka$elm_charts$Internal$Coordinates$toCartesianY = F2(
	function (plane, value) {
		return ($terezka$elm_charts$Internal$Coordinates$range(plane.cN) - A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, value - plane.cN.dC)) + plane.cN.P;
	});
var $terezka$elm_charts$Internal$Svg$fromSvg = F2(
	function (plane, point) {
		return {
			cM: A2($terezka$elm_charts$Internal$Coordinates$toCartesianX, plane, point.cM),
			cN: A2($terezka$elm_charts$Internal$Coordinates$toCartesianY, plane, point.cN)
		};
	});
var $debois$elm_dom$DOM$target = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'target', decoder);
};
var $terezka$elm_charts$Internal$Svg$decoder = F2(
	function (plane, toMsg) {
		var handle = F3(
			function (mouseX, mouseY, box) {
				var yPrev = plane.cN;
				var xPrev = plane.cM;
				var widthPercent = box.cL / plane.cM.dA;
				var heightPercent = box.$7 / plane.cN.dA;
				var newPlane = _Utils_update(
					plane,
					{
						cM: _Utils_update(
							xPrev,
							{dA: box.cL, dB: plane.cM.dB * widthPercent, dC: plane.cM.dC * widthPercent}),
						cN: _Utils_update(
							yPrev,
							{dA: box.$7, dB: plane.cN.dB * heightPercent, dC: plane.cN.dC * heightPercent})
					});
				var searched = A2(
					$terezka$elm_charts$Internal$Svg$fromSvg,
					newPlane,
					{cM: mouseX - box.dz, cN: mouseY - box.eq});
				return A2(toMsg, newPlane, searched);
			});
		return A4(
			$elm$json$Json$Decode$map3,
			handle,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
			$debois$elm_dom$DOM$target($terezka$elm_charts$Internal$Svg$decodePosition));
	});
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $terezka$elm_charts$Internal$Svg$container = F5(
	function (plane, config, below, chartEls, above) {
		var toEvent = function (event) {
			return A2(
				$elm$svg$Svg$Events$on,
				event.dH,
				A2($terezka$elm_charts$Internal$Svg$decoder, plane, event.b$));
		};
		var svgAttrsSize = config.aY ? _List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox(
				'0 0 ' + ($elm$core$String$fromFloat(plane.cM.dA) + (' ' + $elm$core$String$fromFloat(plane.cN.dA)))),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]) : _List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(plane.cM.dA)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(plane.cN.dA)),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]);
		var htmlAttrsSize = config.aY ? _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%')
			]) : _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$elm$core$String$fromFloat(plane.cM.dA) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$elm$core$String$fromFloat(plane.cN.dA) + 'px')
			]);
		var htmlAttrsDef = _List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-charts__container-inner')
			]);
		var htmlAttrs = _Utils_ap(
			config.aS,
			_Utils_ap(htmlAttrsDef, htmlAttrsSize));
		var chartPosition = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(plane.cM.dC)),
				$elm$svg$Svg$Attributes$y(
				$elm$core$String$fromFloat(plane.cN.dC)),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(
					$terezka$elm_charts$Internal$Coordinates$innerWidth(plane))),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(
					$terezka$elm_charts$Internal$Coordinates$innerHeight(plane))),
				$elm$svg$Svg$Attributes$fill('transparent')
			]);
		var clipPathDefs = A2(
			$elm$svg$Svg$defs,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$clipPath,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$id(
							$terezka$elm_charts$Internal$Coordinates$toId(plane))
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$rect, chartPosition, _List_Nil)
						]))
				]));
		var catcher = A2(
			$elm$svg$Svg$rect,
			_Utils_ap(
				chartPosition,
				A2($elm$core$List$map, toEvent, config.de)),
			_List_Nil);
		var chart = A2(
			$elm$svg$Svg$svg,
			_Utils_ap(svgAttrsSize, config.f),
			_Utils_ap(
				_List_fromArray(
					[clipPathDefs]),
				_Utils_ap(
					chartEls,
					_List_fromArray(
						[catcher]))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('elm-charts__container'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					htmlAttrs,
					_Utils_ap(
						below,
						_Utils_ap(
							_List_fromArray(
								[chart]),
							above)))
				]));
	});
var $terezka$elm_charts$Chart$Attributes$lowest = F3(
	function (v, edit, b) {
		return _Utils_update(
			b,
			{
				P: A3(edit, v, b.P, b.c5)
			});
	});
var $terezka$elm_charts$Chart$Attributes$orLower = F3(
	function (least, real, _v0) {
		return (_Utils_cmp(real, least) > 0) ? least : real;
	});
var $terezka$elm_charts$Chart$definePlane = F2(
	function (config, elements) {
		var width = A2($elm$core$Basics$max, 1, (config.cL - config.X.dz) - config.X.d$);
		var toLimit = F5(
			function (length, marginMin, marginMax, min, max) {
				return {c4: max, c5: min, dA: length, dB: marginMax, dC: marginMin, D: max, P: min};
			});
		var height = A2($elm$core$Basics$max, 1, (config.$7 - config.X.cY) - config.X.eq);
		var fixSingles = function (bs) {
			return _Utils_eq(bs.P, bs.D) ? _Utils_update(
				bs,
				{D: bs.P + 10}) : bs;
		};
		var collectLimits = F2(
			function (el, acc) {
				switch (el.$) {
					case 0:
						return acc;
					case 1:
						var lims = el.a;
						return _Utils_ap(acc, lims);
					case 2:
						var lims = el.a;
						return _Utils_ap(acc, lims);
					case 3:
						return acc;
					case 4:
						return acc;
					case 5:
						return acc;
					case 6:
						return acc;
					case 7:
						return acc;
					case 8:
						return acc;
					case 9:
						return acc;
					case 10:
						return acc;
					case 11:
						var subs = el.a;
						return A3($elm$core$List$foldl, collectLimits, acc, subs);
					case 12:
						return acc;
					default:
						return acc;
				}
			});
		var limits_ = function (pos) {
			return function (_v3) {
				var x = _v3.cM;
				var y = _v3.cN;
				return {
					cM: fixSingles(x),
					cN: fixSingles(y)
				};
			}(
				{
					cM: A5(toLimit, width, config.ak.dz, config.ak.d$, pos.aA, pos.aL),
					cN: A5(toLimit, height, config.ak.eq, config.ak.cY, pos.eB, pos.bG)
				});
		}(
			A2(
				$terezka$elm_charts$Internal$Coordinates$foldPosition,
				$elm$core$Basics$identity,
				A3($elm$core$List$foldl, collectLimits, _List_Nil, elements)));
		var calcRange = function () {
			var _v2 = config.bq;
			if (!_v2.b) {
				return limits_.cM;
			} else {
				var some = _v2;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (f, b) {
							return f(b);
						}),
					limits_.cM,
					some);
			}
		}();
		var calcDomain = function () {
			var _v1 = config.a6;
			if (!_v1.b) {
				return A3($terezka$elm_charts$Chart$Attributes$lowest, 0, $terezka$elm_charts$Chart$Attributes$orLower, limits_.cN);
			} else {
				var some = _v1;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (f, b) {
							return f(b);
						}),
					limits_.cN,
					some);
			}
		}();
		var unpadded = {cM: calcRange, cN: calcDomain};
		var scalePadX = $terezka$elm_charts$Internal$Coordinates$scaleCartesianX(unpadded);
		var xMax = calcRange.D + scalePadX(config.X.d$);
		var xMin = calcRange.P - scalePadX(config.X.dz);
		var scalePadY = $terezka$elm_charts$Internal$Coordinates$scaleCartesianY(unpadded);
		var yMax = calcDomain.D + scalePadY(config.X.eq);
		var yMin = calcDomain.P - scalePadY(config.X.cY);
		return {
			cM: _Utils_update(
				calcRange,
				{
					dA: config.cL,
					D: A2($elm$core$Basics$max, xMin, xMax),
					P: A2($elm$core$Basics$min, xMin, xMax)
				}),
			cN: _Utils_update(
				calcDomain,
				{
					dA: config.$7,
					D: A2($elm$core$Basics$max, yMin, yMax),
					P: A2($elm$core$Basics$min, yMin, yMax)
				})
		};
	});
var $terezka$elm_charts$Chart$getItems = F2(
	function (plane, elements) {
		var toItems = F2(
			function (el, acc) {
				switch (el.$) {
					case 0:
						return acc;
					case 1:
						var items = el.b;
						return _Utils_ap(acc, items);
					case 2:
						var items = el.b;
						return _Utils_ap(acc, items);
					case 3:
						var item = el.a;
						return _Utils_ap(
							acc,
							_List_fromArray(
								[item]));
					case 4:
						var func = el.a;
						return acc;
					case 5:
						return acc;
					case 6:
						return acc;
					case 7:
						return acc;
					case 8:
						return acc;
					case 9:
						return acc;
					case 10:
						return acc;
					case 11:
						var subs = el.a;
						return A3($elm$core$List$foldl, toItems, acc, subs);
					case 12:
						return acc;
					default:
						return acc;
				}
			});
		return A3($elm$core$List$foldl, toItems, _List_Nil, elements);
	});
var $terezka$elm_charts$Chart$getLegends = function (elements) {
	var toLegends = F2(
		function (el, acc) {
			switch (el.$) {
				case 0:
					return acc;
				case 1:
					var legends_ = el.c;
					return _Utils_ap(acc, legends_);
				case 2:
					var legends_ = el.c;
					return _Utils_ap(acc, legends_);
				case 3:
					return acc;
				case 4:
					return acc;
				case 5:
					return acc;
				case 6:
					return acc;
				case 7:
					return acc;
				case 8:
					return acc;
				case 9:
					return acc;
				case 10:
					return acc;
				case 11:
					var subs = el.a;
					return A3($elm$core$List$foldl, toLegends, acc, subs);
				case 12:
					return acc;
				default:
					return acc;
			}
		});
	return A3($elm$core$List$foldl, toLegends, _List_Nil, elements);
};
var $terezka$elm_charts$Chart$TickValues = F4(
	function (xAxis, yAxis, xs, ys) {
		return {aM: xAxis, G: xs, aN: yAxis, Q: ys};
	});
var $terezka$elm_charts$Chart$getTickValues = F3(
	function (plane, items, elements) {
		var toValues = F2(
			function (el, acc) {
				switch (el.$) {
					case 0:
						return acc;
					case 1:
						return acc;
					case 2:
						var func = el.d;
						return A2(func, plane, acc);
					case 3:
						var func = el.b;
						return acc;
					case 4:
						var func = el.a;
						return A2(func, plane, acc);
					case 5:
						var func = el.a;
						return A2(func, plane, acc);
					case 6:
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 7:
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 8:
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 10:
						var func = el.a;
						return A3(
							$elm$core$List$foldl,
							toValues,
							acc,
							A2(func, plane, items));
					case 9:
						return acc;
					case 11:
						var subs = el.a;
						return A3($elm$core$List$foldl, toValues, acc, subs);
					case 12:
						return acc;
					default:
						return acc;
				}
			});
		return A3(
			$elm$core$List$foldl,
			toValues,
			A4($terezka$elm_charts$Chart$TickValues, _List_Nil, _List_Nil, _List_Nil, _List_Nil),
			elements);
	});
var $terezka$elm_charts$Chart$GridElement = function (a) {
	return {$: 9, a: a};
};
var $terezka$elm_charts$Internal$Svg$Circle = 0;
var $terezka$elm_charts$Chart$Attributes$circle = function (config) {
	return _Utils_update(
		config,
		{
			av: $elm$core$Maybe$Just(0)
		});
};
var $terezka$elm_charts$Internal$Helpers$darkGray = 'rgb(200 200 200)';
var $terezka$elm_charts$Chart$Attributes$dashed = F2(
	function (value, config) {
		return _Utils_update(
			config,
			{aO: value});
	});
var $terezka$elm_charts$Internal$Svg$defaultDot = {A: '', C: 0, b: $terezka$elm_charts$Internal$Helpers$pink, o: false, dq: 0, dr: '', ds: 5, V: 1, av: $elm$core$Maybe$Nothing, d4: 6};
var $terezka$elm_charts$Internal$Svg$isWithinPlane = F3(
	function (plane, x, y) {
		return _Utils_eq(
			A3($elm$core$Basics$clamp, plane.cM.P, plane.cM.D, x),
			x) && _Utils_eq(
			A3($elm$core$Basics$clamp, plane.cN.P, plane.cN.D, y),
			y);
	});
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $terezka$elm_charts$Internal$Svg$plusPath = F4(
	function (area_, off, x_, y_) {
		var side = $elm$core$Basics$sqrt(area_ / 4) + off;
		var r6 = side / 2;
		var r3 = side;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'M' + ($elm$core$String$fromFloat(x_ - r6) + (' ' + $elm$core$String$fromFloat(((y_ - r3) - r6) + off))),
					'v' + $elm$core$String$fromFloat(r3 - off),
					'h' + $elm$core$String$fromFloat((-r3) + off),
					'v' + $elm$core$String$fromFloat(r3),
					'h' + $elm$core$String$fromFloat(r3 - off),
					'v' + $elm$core$String$fromFloat(r3 - off),
					'h' + $elm$core$String$fromFloat(r3),
					'v' + $elm$core$String$fromFloat((-r3) + off),
					'h' + $elm$core$String$fromFloat(r3 - off),
					'v' + $elm$core$String$fromFloat(-r3),
					'h' + $elm$core$String$fromFloat((-r3) + off),
					'v' + $elm$core$String$fromFloat((-r3) + off),
					'h' + $elm$core$String$fromFloat(-r3),
					'v' + $elm$core$String$fromFloat(r3 - off)
				]));
	});
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$tan = _Basics_tan;
var $terezka$elm_charts$Internal$Svg$trianglePath = F4(
	function (area_, off, x_, y_) {
		var side = $elm$core$Basics$sqrt(
			(area_ * 4) / $elm$core$Basics$sqrt(3)) + (off * $elm$core$Basics$sqrt(3));
		var height = ($elm$core$Basics$sqrt(3) * side) / 2;
		var fromMiddle = height - (($elm$core$Basics$tan(
			$elm$core$Basics$degrees(30)) * side) / 2);
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'M' + ($elm$core$String$fromFloat(x_) + (' ' + $elm$core$String$fromFloat(y_ - fromMiddle))),
					'l' + ($elm$core$String$fromFloat((-side) / 2) + (' ' + $elm$core$String$fromFloat(height))),
					'h' + $elm$core$String$fromFloat(side),
					'z'
				]));
	});
var $terezka$elm_charts$Internal$Svg$dot = F5(
	function (plane, toX, toY, config, datum_) {
		var yOrg = toY(datum_);
		var y_ = A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, yOrg);
		var xOrg = toX(datum_);
		var x_ = A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, xOrg);
		var styleAttrs = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$stroke(
				(config.A === '') ? config.b : config.A),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(config.C)),
				$elm$svg$Svg$Attributes$fillOpacity(
				$elm$core$String$fromFloat(config.V)),
				$elm$svg$Svg$Attributes$fill(config.b),
				$elm$svg$Svg$Attributes$class('elm-charts__dot'),
				config.o ? $terezka$elm_charts$Internal$Svg$withinChartArea(plane) : $elm$svg$Svg$Attributes$class('')
			]);
		var showDot = A3($terezka$elm_charts$Internal$Svg$isWithinPlane, plane, xOrg, yOrg) || config.o;
		var highlightColor = (config.dr === '') ? config.b : config.dr;
		var highlightAttrs = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$stroke(highlightColor),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(config.ds)),
				$elm$svg$Svg$Attributes$strokeOpacity(
				$elm$core$String$fromFloat(config.dq)),
				$elm$svg$Svg$Attributes$fill('transparent'),
				$elm$svg$Svg$Attributes$class('elm-charts__dot-highlight')
			]);
		var view = F3(
			function (toEl, highlightOff, toAttrs) {
				return (config.dq > 0) ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__dot-container')
						]),
					_List_fromArray(
						[
							A2(
							toEl,
							_Utils_ap(
								toAttrs(highlightOff),
								highlightAttrs),
							_List_Nil),
							A2(
							toEl,
							_Utils_ap(
								toAttrs(0),
								styleAttrs),
							_List_Nil)
						])) : A2(
					toEl,
					_Utils_ap(
						toAttrs(0),
						styleAttrs),
					_List_Nil);
			});
		var area_ = (2 * $elm$core$Basics$pi) * config.d4;
		if (!showDot) {
			return $elm$svg$Svg$text('');
		} else {
			var _v0 = config.av;
			if (_v0.$ === 1) {
				return $elm$svg$Svg$text('');
			} else {
				switch (_v0.a) {
					case 0:
						var _v1 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$circle,
							config.ds / 2,
							function (off) {
								var radius = $elm$core$Basics$sqrt(area_ / $elm$core$Basics$pi);
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$cx(
										$elm$core$String$fromFloat(x_)),
										$elm$svg$Svg$Attributes$cy(
										$elm$core$String$fromFloat(y_)),
										$elm$svg$Svg$Attributes$r(
										$elm$core$String$fromFloat(radius + off))
									]);
							});
					case 1:
						var _v2 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.ds,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$trianglePath, area_, off, x_, y_))
									]);
							});
					case 2:
						var _v3 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$rect,
							config.ds,
							function (off) {
								var side = $elm$core$Basics$sqrt(area_);
								var sideOff = side + off;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(x_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(y_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(sideOff))
									]);
							});
					case 3:
						var _v4 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$rect,
							config.ds,
							function (off) {
								var side = $elm$core$Basics$sqrt(area_);
								var sideOff = side + off;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(x_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(y_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$transform(
										'rotate(45 ' + ($elm$core$String$fromFloat(x_) + (' ' + ($elm$core$String$fromFloat(y_) + ')'))))
									]);
							});
					case 4:
						var _v5 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.ds,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$plusPath, area_, off, x_, y_)),
										$elm$svg$Svg$Attributes$transform(
										'rotate(45 ' + ($elm$core$String$fromFloat(x_) + (' ' + ($elm$core$String$fromFloat(y_) + ')'))))
									]);
							});
					default:
						var _v6 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.ds,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$plusPath, area_, off, x_, y_))
									]);
							});
				}
			}
		}
	});
var $terezka$elm_charts$Chart$Svg$dot = F4(
	function (plane, toX, toY, edits) {
		return A4(
			$terezka$elm_charts$Internal$Svg$dot,
			plane,
			toX,
			toY,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultDot));
	});
var $terezka$elm_charts$Internal$Helpers$gray = '#EFF2FA';
var $terezka$elm_charts$Internal$Svg$defaultLine = {f: _List_Nil, cZ: false, b: 'rgb(210, 210, 210)', aO: _List_Nil, h: false, o: false, V: 1, ec: -90, ed: 0, cL: 1, aA: $elm$core$Maybe$Nothing, aL: $elm$core$Maybe$Nothing, eA: $elm$core$Maybe$Nothing, j: 0, eB: $elm$core$Maybe$Nothing, bG: $elm$core$Maybe$Nothing, eC: $elm$core$Maybe$Nothing, k: 0};
var $elm$core$Basics$cos = _Basics_cos;
var $terezka$elm_charts$Internal$Svg$lengthInCartesianX = $terezka$elm_charts$Internal$Coordinates$scaleCartesianX;
var $terezka$elm_charts$Internal$Svg$lengthInCartesianY = $terezka$elm_charts$Internal$Coordinates$scaleCartesianY;
var $elm$core$Basics$sin = _Basics_sin;
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $terezka$elm_charts$Internal$Svg$line = F2(
	function (plane, config) {
		var angle = $elm$core$Basics$degrees(config.ec);
		var _v0 = function () {
			var _v3 = _Utils_Tuple3(
				_Utils_Tuple2(config.aA, config.aL),
				_Utils_Tuple2(config.eB, config.bG),
				_Utils_Tuple2(config.eA, config.eC));
			if (!_v3.a.a.$) {
				if (!_v3.a.b.$) {
					if (_v3.b.a.$ === 1) {
						if (_v3.b.b.$ === 1) {
							var _v4 = _v3.a;
							var a = _v4.a.a;
							var b = _v4.b.a;
							var _v5 = _v3.b;
							var _v6 = _v5.a;
							var _v7 = _v5.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(plane.cN.P, plane.cN.P));
						} else {
							var _v38 = _v3.a;
							var a = _v38.a.a;
							var b = _v38.b.a;
							var _v39 = _v3.b;
							var _v40 = _v39.a;
							var c = _v39.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(c, c));
						}
					} else {
						if (_v3.b.b.$ === 1) {
							var _v41 = _v3.a;
							var a = _v41.a.a;
							var b = _v41.b.a;
							var _v42 = _v3.b;
							var c = _v42.a.a;
							var _v43 = _v42.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(c, c));
						} else {
							return _Utils_Tuple2(
								_Utils_Tuple2(
									A2($elm$core$Maybe$withDefault, plane.cM.P, config.aA),
									A2($elm$core$Maybe$withDefault, plane.cM.D, config.aL)),
								_Utils_Tuple2(
									A2($elm$core$Maybe$withDefault, plane.cN.P, config.eB),
									A2($elm$core$Maybe$withDefault, plane.cN.D, config.bG)));
						}
					}
				} else {
					if (_v3.b.a.$ === 1) {
						if (_v3.b.b.$ === 1) {
							var _v8 = _v3.a;
							var a = _v8.a.a;
							var _v9 = _v8.b;
							var _v10 = _v3.b;
							var _v11 = _v10.a;
							var _v12 = _v10.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, a),
								_Utils_Tuple2(plane.cN.P, plane.cN.D));
						} else {
							if (!_v3.c.a.$) {
								if (!_v3.c.b.$) {
									var _v51 = _v3.a;
									var a = _v51.a.a;
									var _v52 = _v51.b;
									var _v53 = _v3.b;
									var _v54 = _v53.a;
									var b = _v53.b.a;
									var _v55 = _v3.c;
									var xOff = _v55.a.a;
									var yOff = _v55.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v56 = _v3.a;
									var a = _v56.a.a;
									var _v57 = _v56.b;
									var _v58 = _v3.b;
									var _v59 = _v58.a;
									var b = _v58.b.a;
									var _v60 = _v3.c;
									var xOff = _v60.a.a;
									var _v61 = _v60.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 1) {
									var _v44 = _v3.a;
									var a = _v44.a.a;
									var _v45 = _v44.b;
									var _v46 = _v3.b;
									var _v47 = _v46.a;
									var b = _v46.b.a;
									var _v48 = _v3.c;
									var _v49 = _v48.a;
									var _v50 = _v48.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.cM.D),
										_Utils_Tuple2(b, b));
								} else {
									var _v62 = _v3.a;
									var a = _v62.a.a;
									var _v63 = _v62.b;
									var _v64 = _v3.b;
									var _v65 = _v64.a;
									var b = _v64.b.a;
									var _v66 = _v3.c;
									var _v67 = _v66.a;
									var yOff = _v66.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					} else {
						if (!_v3.b.b.$) {
							var _v35 = _v3.a;
							var c = _v35.a.a;
							var _v36 = _v35.b;
							var _v37 = _v3.b;
							var a = _v37.a.a;
							var b = _v37.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(c, c),
								_Utils_Tuple2(a, b));
						} else {
							if (!_v3.c.a.$) {
								if (!_v3.c.b.$) {
									var _v75 = _v3.a;
									var a = _v75.a.a;
									var _v76 = _v75.b;
									var _v77 = _v3.b;
									var b = _v77.a.a;
									var _v78 = _v77.b;
									var _v79 = _v3.c;
									var xOff = _v79.a.a;
									var yOff = _v79.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v80 = _v3.a;
									var a = _v80.a.a;
									var _v81 = _v80.b;
									var _v82 = _v3.b;
									var b = _v82.a.a;
									var _v83 = _v82.b;
									var _v84 = _v3.c;
									var xOff = _v84.a.a;
									var _v85 = _v84.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 1) {
									var _v68 = _v3.a;
									var a = _v68.a.a;
									var _v69 = _v68.b;
									var _v70 = _v3.b;
									var b = _v70.a.a;
									var _v71 = _v70.b;
									var _v72 = _v3.c;
									var _v73 = _v72.a;
									var _v74 = _v72.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.cM.D),
										_Utils_Tuple2(b, b));
								} else {
									var _v86 = _v3.a;
									var a = _v86.a.a;
									var _v87 = _v86.b;
									var _v88 = _v3.b;
									var b = _v88.a.a;
									var _v89 = _v88.b;
									var _v90 = _v3.c;
									var _v91 = _v90.a;
									var yOff = _v90.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					}
				}
			} else {
				if (!_v3.a.b.$) {
					if (_v3.b.a.$ === 1) {
						if (_v3.b.b.$ === 1) {
							var _v13 = _v3.a;
							var _v14 = _v13.a;
							var b = _v13.b.a;
							var _v15 = _v3.b;
							var _v16 = _v15.a;
							var _v17 = _v15.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(b, b),
								_Utils_Tuple2(plane.cN.P, plane.cN.D));
						} else {
							if (!_v3.c.a.$) {
								if (!_v3.c.b.$) {
									var _v99 = _v3.a;
									var _v100 = _v99.a;
									var a = _v99.b.a;
									var _v101 = _v3.b;
									var _v102 = _v101.a;
									var b = _v101.b.a;
									var _v103 = _v3.c;
									var xOff = _v103.a.a;
									var yOff = _v103.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v104 = _v3.a;
									var _v105 = _v104.a;
									var a = _v104.b.a;
									var _v106 = _v3.b;
									var _v107 = _v106.a;
									var b = _v106.b.a;
									var _v108 = _v3.c;
									var xOff = _v108.a.a;
									var _v109 = _v108.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 1) {
									var _v92 = _v3.a;
									var _v93 = _v92.a;
									var a = _v92.b.a;
									var _v94 = _v3.b;
									var _v95 = _v94.a;
									var b = _v94.b.a;
									var _v96 = _v3.c;
									var _v97 = _v96.a;
									var _v98 = _v96.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.cM.D),
										_Utils_Tuple2(b, b));
								} else {
									var _v110 = _v3.a;
									var _v111 = _v110.a;
									var a = _v110.b.a;
									var _v112 = _v3.b;
									var _v113 = _v112.a;
									var b = _v112.b.a;
									var _v114 = _v3.c;
									var _v115 = _v114.a;
									var yOff = _v114.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					} else {
						if (!_v3.b.b.$) {
							var _v32 = _v3.a;
							var _v33 = _v32.a;
							var c = _v32.b.a;
							var _v34 = _v3.b;
							var a = _v34.a.a;
							var b = _v34.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(c, c),
								_Utils_Tuple2(a, b));
						} else {
							if (!_v3.c.a.$) {
								if (!_v3.c.b.$) {
									var _v123 = _v3.a;
									var _v124 = _v123.a;
									var a = _v123.b.a;
									var _v125 = _v3.b;
									var b = _v125.a.a;
									var _v126 = _v125.b;
									var _v127 = _v3.c;
									var xOff = _v127.a.a;
									var yOff = _v127.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v128 = _v3.a;
									var _v129 = _v128.a;
									var a = _v128.b.a;
									var _v130 = _v3.b;
									var b = _v130.a.a;
									var _v131 = _v130.b;
									var _v132 = _v3.c;
									var xOff = _v132.a.a;
									var _v133 = _v132.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 1) {
									var _v116 = _v3.a;
									var _v117 = _v116.a;
									var a = _v116.b.a;
									var _v118 = _v3.b;
									var b = _v118.a.a;
									var _v119 = _v118.b;
									var _v120 = _v3.c;
									var _v121 = _v120.a;
									var _v122 = _v120.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.cM.D),
										_Utils_Tuple2(b, b));
								} else {
									var _v134 = _v3.a;
									var _v135 = _v134.a;
									var a = _v134.b.a;
									var _v136 = _v3.b;
									var b = _v136.a.a;
									var _v137 = _v136.b;
									var _v138 = _v3.c;
									var _v139 = _v138.a;
									var yOff = _v138.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					}
				} else {
					if (!_v3.b.a.$) {
						if (!_v3.b.b.$) {
							var _v18 = _v3.a;
							var _v19 = _v18.a;
							var _v20 = _v18.b;
							var _v21 = _v3.b;
							var a = _v21.a.a;
							var b = _v21.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.cM.P, plane.cM.P),
								_Utils_Tuple2(a, b));
						} else {
							var _v22 = _v3.a;
							var _v23 = _v22.a;
							var _v24 = _v22.b;
							var _v25 = _v3.b;
							var a = _v25.a.a;
							var _v26 = _v25.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.cM.P, plane.cM.D),
								_Utils_Tuple2(a, a));
						}
					} else {
						if (!_v3.b.b.$) {
							var _v27 = _v3.a;
							var _v28 = _v27.a;
							var _v29 = _v27.b;
							var _v30 = _v3.b;
							var _v31 = _v30.a;
							var b = _v30.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.cM.P, plane.cM.D),
								_Utils_Tuple2(b, b));
						} else {
							var _v140 = _v3.a;
							var _v141 = _v140.a;
							var _v142 = _v140.b;
							var _v143 = _v3.b;
							var _v144 = _v143.a;
							var _v145 = _v143.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.cM.P, plane.cM.D),
								_Utils_Tuple2(plane.cN.P, plane.cN.D));
						}
					}
				}
			}
		}();
		var _v1 = _v0.a;
		var x1 = _v1.a;
		var x2 = _v1.b;
		var _v2 = _v0.b;
		var y1 = _v2.a;
		var y2 = _v2.b;
		var x1_ = x1 + A2($terezka$elm_charts$Internal$Svg$lengthInCartesianX, plane, config.j);
		var x2_ = x2 + A2($terezka$elm_charts$Internal$Svg$lengthInCartesianX, plane, config.j);
		var y1_ = y1 - A2($terezka$elm_charts$Internal$Svg$lengthInCartesianY, plane, config.k);
		var y2_ = y2 - A2($terezka$elm_charts$Internal$Svg$lengthInCartesianY, plane, config.k);
		var _v146 = (config.ed > 0) ? _Utils_Tuple2(
			A2(
				$terezka$elm_charts$Internal$Svg$lengthInCartesianX,
				plane,
				$elm$core$Basics$cos(angle) * config.ed),
			A2(
				$terezka$elm_charts$Internal$Svg$lengthInCartesianY,
				plane,
				$elm$core$Basics$sin(angle) * config.ed)) : _Utils_Tuple2(0, 0);
		var tickOffsetX = _v146.a;
		var tickOffsetY = _v146.b;
		var cmds = config.h ? _Utils_ap(
			(config.ed > 0) ? _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x2_ + tickOffsetX, y2_ + tickOffsetY),
					A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
				]) : _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x2_, y2_)
				]),
			_Utils_ap(
				config.cZ ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y1_),
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
					]) : _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
					]),
				(config.ed > 0) ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_ + tickOffsetX, y1_ + tickOffsetY)
					]) : _List_Nil)) : _Utils_ap(
			(config.ed > 0) ? _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x1_ + tickOffsetX, y1_ + tickOffsetY),
					A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
				]) : _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x1_, y1_)
				]),
			_Utils_ap(
				config.cZ ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y2_),
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
					]) : _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
					]),
				(config.ed > 0) ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_ + tickOffsetX, y2_ + tickOffsetY)
					]) : _List_Nil));
		return A4(
			$terezka$elm_charts$Internal$Svg$withAttrs,
			config.f,
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('elm-charts__line'),
					$elm$svg$Svg$Attributes$fill('transparent'),
					$elm$svg$Svg$Attributes$stroke(config.b),
					$elm$svg$Svg$Attributes$strokeWidth(
					$elm$core$String$fromFloat(config.cL)),
					$elm$svg$Svg$Attributes$strokeOpacity(
					$elm$core$String$fromFloat(config.V)),
					$elm$svg$Svg$Attributes$strokeDasharray(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, $elm$core$String$fromFloat, config.aO))),
					$elm$svg$Svg$Attributes$d(
					A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
					config.o ? $terezka$elm_charts$Internal$Svg$withinChartArea(plane) : $elm$svg$Svg$Attributes$class('')
				]),
			_List_Nil);
	});
var $terezka$elm_charts$Chart$Svg$line = F2(
	function (plane, edits) {
		return A2(
			$terezka$elm_charts$Internal$Svg$line,
			plane,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultLine));
	});
var $terezka$elm_charts$Chart$Attributes$size = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{d4: v});
	});
var $terezka$elm_charts$Chart$Attributes$width = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{cL: v});
	});
var $terezka$elm_charts$Chart$Attributes$x1 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				aA: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$Attributes$y1 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				eB: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$grid = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{b: '', aO: _List_Nil, aC: false, cL: 0});
	var width = (!config.cL) ? (config.aC ? 0.5 : 1) : config.cL;
	var color = $elm$core$String$isEmpty(config.b) ? (config.aC ? $terezka$elm_charts$Internal$Helpers$darkGray : $terezka$elm_charts$Internal$Helpers$gray) : config.b;
	var toDot = F4(
		function (vs, p, x, y) {
			return (A2($elm$core$List$member, x, vs.aM) || A2($elm$core$List$member, y, vs.aN)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A5(
					$terezka$elm_charts$Chart$Svg$dot,
					p,
					function ($) {
						return $.cM;
					},
					function ($) {
						return $.cN;
					},
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$size(width),
							$terezka$elm_charts$Chart$Attributes$circle
						]),
					{cM: x, cN: y}));
		});
	var toXGrid = F3(
		function (vs, p, v) {
			return A2($elm$core$List$member, v, vs.aM) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$terezka$elm_charts$Chart$Svg$line,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$width(width),
							$terezka$elm_charts$Chart$Attributes$x1(v),
							$terezka$elm_charts$Chart$Attributes$dashed(config.aO)
						])));
		});
	var toYGrid = F3(
		function (vs, p, v) {
			return A2($elm$core$List$member, v, vs.aN) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$terezka$elm_charts$Chart$Svg$line,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$width(width),
							$terezka$elm_charts$Chart$Attributes$y1(v),
							$terezka$elm_charts$Chart$Attributes$dashed(config.aO)
						])));
		});
	return $terezka$elm_charts$Chart$GridElement(
		F2(
			function (p, vs) {
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__grid')
						]),
					config.aC ? A2(
						$elm$core$List$concatMap,
						function (x) {
							return A2(
								$elm$core$List$filterMap,
								A3(toDot, vs, p, x),
								vs.Q);
						},
						vs.G) : _List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__x-grid')
								]),
							A2(
								$elm$core$List$filterMap,
								A2(toXGrid, vs, p),
								vs.G)),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__y-grid')
								]),
							A2(
								$elm$core$List$filterMap,
								A2(toYGrid, vs, p),
								vs.Q))
						]));
			}));
};
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $terezka$elm_charts$Chart$viewElements = F6(
	function (config, plane, tickValues, allItems, allLegends, elements) {
		var viewOne = F2(
			function (el, _v0) {
				var before = _v0.a;
				var chart_ = _v0.b;
				var after = _v0.c;
				switch (el.$) {
					case 0:
						return _Utils_Tuple3(before, chart_, after);
					case 1:
						var view = el.d;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 2:
						var view = el.e;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 3:
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 4:
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 5:
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 6:
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 7:
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 8:
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 9:
						var view = el.a;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(view, plane, tickValues),
								chart_),
							after);
					case 10:
						var func = el.a;
						return A3(
							$elm$core$List$foldr,
							viewOne,
							_Utils_Tuple3(before, chart_, after),
							A2(func, plane, allItems));
					case 11:
						var els = el.a;
						return A3(
							$elm$core$List$foldr,
							viewOne,
							_Utils_Tuple3(before, chart_, after),
							els);
					case 12:
						var view = el.a;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					default:
						var view = el.a;
						return _Utils_Tuple3(
							($elm$core$List$length(chart_) > 0) ? A2(
								$elm$core$List$cons,
								A2(view, plane, allLegends),
								before) : before,
							chart_,
							($elm$core$List$length(chart_) > 0) ? after : A2(
								$elm$core$List$cons,
								A2(view, plane, allLegends),
								after));
				}
			});
		return A3(
			$elm$core$List$foldr,
			viewOne,
			_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
			elements);
	});
var $terezka$elm_charts$Chart$chart = F2(
	function (edits, unindexedElements) {
		var indexedElements = function () {
			var toIndexedEl = F2(
				function (el, _v4) {
					var acc = _v4.a;
					var index = _v4.b;
					switch (el.$) {
						case 0:
							var toElAndIndex = el.a;
							var _v6 = toElAndIndex(index);
							var newEl = _v6.a;
							var newIndex = _v6.b;
							return _Utils_Tuple2(
								_Utils_ap(
									acc,
									_List_fromArray(
										[newEl])),
								newIndex);
						case 11:
							var els = el.a;
							return A3(
								$elm$core$List$foldl,
								toIndexedEl,
								_Utils_Tuple2(acc, index),
								els);
						default:
							return _Utils_Tuple2(
								_Utils_ap(
									acc,
									_List_fromArray(
										[el])),
								index);
					}
				});
			return A3(
				$elm$core$List$foldl,
				toIndexedEl,
				_Utils_Tuple2(_List_Nil, 0),
				unindexedElements).a;
		}();
		var elements = function () {
			var isGrid = function (el) {
				if (el.$ === 9) {
					return true;
				} else {
					return false;
				}
			};
			return A2($elm$core$List$any, isGrid, indexedElements) ? indexedElements : A2(
				$elm$core$List$cons,
				$terezka$elm_charts$Chart$grid(_List_Nil),
				indexedElements);
		}();
		var legends_ = $terezka$elm_charts$Chart$getLegends(elements);
		var config = A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{
				f: _List_fromArray(
					[
						$elm$svg$Svg$Attributes$style('overflow: visible;')
					]),
				a6: _List_Nil,
				de: _List_Nil,
				$7: 300,
				aS: _List_Nil,
				ak: {cY: 0, dz: 0, d$: 0, eq: 0},
				X: {cY: 0, dz: 0, d$: 0, eq: 0},
				bq: _List_Nil,
				aY: true,
				cL: 300
			});
		var plane = A2($terezka$elm_charts$Chart$definePlane, config, elements);
		var items = A2($terezka$elm_charts$Chart$getItems, plane, elements);
		var toEvent = function (_v2) {
			var event_ = _v2;
			var _v1 = event_.c8;
			var decoder = _v1;
			return A2(
				$terezka$elm_charts$Internal$Svg$Event,
				event_.dH,
				decoder(items));
		};
		var tickValues = A3($terezka$elm_charts$Chart$getTickValues, plane, items, elements);
		var _v0 = A6($terezka$elm_charts$Chart$viewElements, config, plane, tickValues, items, legends_, elements);
		var beforeEls = _v0.a;
		var chartEls = _v0.b;
		var afterEls = _v0.c;
		return A5(
			$terezka$elm_charts$Internal$Svg$container,
			plane,
			{
				f: config.f,
				de: A2($elm$core$List$map, toEvent, config.de),
				aS: config.aS,
				aY: config.aY
			},
			beforeEls,
			chartEls,
			afterEls);
	});
var $terezka$elm_charts$Chart$Attributes$domain = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{a6: v});
	});
var $terezka$elm_charts$Chart$Attributes$height = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{$7: v});
	});
var $terezka$elm_charts$Chart$Attributes$highest = F3(
	function (v, edit, b) {
		return _Utils_update(
			b,
			{
				D: A3(edit, v, b.D, b.c4)
			});
	});
var $terezka$elm_charts$Chart$Attributes$margin = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{ak: v});
	});
var $terezka$elm_charts$Chart$Attributes$orHigher = F3(
	function (most, real, _v0) {
		return (_Utils_cmp(real, most) < 0) ? most : real;
	});
var $terezka$elm_charts$Chart$Attributes$withGrid = function (config) {
	return _Utils_update(
		config,
		{i: true});
};
var $terezka$elm_charts$Internal$Svg$End = 0;
var $terezka$elm_charts$Internal$Svg$Floats = {$: 0};
var $terezka$elm_charts$Chart$LabelsElement = F3(
	function (a, b, c) {
		return {$: 7, a: a, b: b, c: c};
	});
var $terezka$elm_charts$Internal$Svg$Start = 1;
var $terezka$elm_charts$Internal$Svg$defaultLabel = {l: $elm$core$Maybe$Nothing, f: _List_Nil, A: 'white', C: 0, b: '#808BAB', m: $elm$core$Maybe$Nothing, n: $elm$core$Maybe$Nothing, o: false, r: 0, s: false, j: 0, k: 0};
var $terezka$elm_charts$Internal$Svg$Generator = $elm$core$Basics$identity;
var $terezka$intervals$Intervals$Around = function (a) {
	return {$: 1, a: a};
};
var $terezka$intervals$Intervals$around = $terezka$intervals$Intervals$Around;
var $terezka$intervals$Intervals$ceilingTo = F2(
	function (prec, number) {
		return prec * $elm$core$Basics$ceiling(number / prec);
	});
var $elm$core$Basics$round = _Basics_round;
var $terezka$intervals$Intervals$getBeginning = F2(
	function (min, interval) {
		var multiple = min / interval;
		return _Utils_eq(
			multiple,
			$elm$core$Basics$round(multiple)) ? min : A2($terezka$intervals$Intervals$ceilingTo, interval, min);
	});
var $elm$core$String$toFloat = _String_toFloat;
var $terezka$intervals$Intervals$correctFloat = function (prec) {
	return A2(
		$elm$core$Basics$composeR,
		$myrho$elm_round$Round$round(prec),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$String$toFloat,
			$elm$core$Maybe$withDefault(0)));
};
var $terezka$intervals$Intervals$getMultiples = F3(
	function (magnitude, allowDecimals, hasTickAmount) {
		var defaults = hasTickAmount ? _List_fromArray(
			[1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) : _List_fromArray(
			[1, 2, 2.5, 5, 10]);
		return allowDecimals ? defaults : ((magnitude === 1) ? A2(
			$elm$core$List$filter,
			function (n) {
				return _Utils_eq(
					$elm$core$Basics$round(n),
					n);
			},
			defaults) : ((magnitude <= 0.1) ? _List_fromArray(
			[1 / magnitude]) : defaults));
	});
var $terezka$intervals$Intervals$getPrecision = function (number) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(number));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var before = _v0.a;
		var _v1 = _v0.b;
		var after = _v1.a;
		return $elm$core$Basics$abs(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(after)));
	} else {
		var _v2 = A2(
			$elm$core$String$split,
			'.',
			$elm$core$String$fromFloat(number));
		if ((_v2.b && _v2.b.b) && (!_v2.b.b.b)) {
			var before = _v2.a;
			var _v3 = _v2.b;
			var after = _v3.a;
			return $elm$core$String$length(after);
		} else {
			return 0;
		}
	}
};
var $elm$core$Basics$e = _Basics_e;
var $elm$core$Basics$pow = _Basics_pow;
var $terezka$intervals$Intervals$toMagnitude = function (num) {
	return A2(
		$elm$core$Basics$pow,
		10,
		$elm$core$Basics$floor(
			A2($elm$core$Basics$logBase, $elm$core$Basics$e, num) / A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10)));
};
var $terezka$intervals$Intervals$getInterval = F3(
	function (intervalRaw, allowDecimals, hasTickAmount) {
		var magnitude = $terezka$intervals$Intervals$toMagnitude(intervalRaw);
		var multiples = A3($terezka$intervals$Intervals$getMultiples, magnitude, allowDecimals, hasTickAmount);
		var normalized = intervalRaw / magnitude;
		var findMultipleExact = function (multiples_) {
			findMultipleExact:
			while (true) {
				if (multiples_.b) {
					var m1 = multiples_.a;
					var rest = multiples_.b;
					if (_Utils_cmp(m1 * magnitude, intervalRaw) > -1) {
						return m1;
					} else {
						var $temp$multiples_ = rest;
						multiples_ = $temp$multiples_;
						continue findMultipleExact;
					}
				} else {
					return 1;
				}
			}
		};
		var findMultiple = function (multiples_) {
			findMultiple:
			while (true) {
				if (multiples_.b) {
					if (multiples_.b.b) {
						var m1 = multiples_.a;
						var _v2 = multiples_.b;
						var m2 = _v2.a;
						var rest = _v2.b;
						if (_Utils_cmp(normalized, (m1 + m2) / 2) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = A2($elm$core$List$cons, m2, rest);
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					} else {
						var m1 = multiples_.a;
						var rest = multiples_.b;
						if (_Utils_cmp(normalized, m1) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = rest;
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					}
				} else {
					return 1;
				}
			}
		};
		var multiple = hasTickAmount ? findMultipleExact(multiples) : findMultiple(multiples);
		var precision = $terezka$intervals$Intervals$getPrecision(magnitude) + $terezka$intervals$Intervals$getPrecision(multiple);
		return A2($terezka$intervals$Intervals$correctFloat, precision, multiple * magnitude);
	});
var $terezka$intervals$Intervals$positions = F5(
	function (range, beginning, interval, m, acc) {
		positions:
		while (true) {
			var nextPosition = A2(
				$terezka$intervals$Intervals$correctFloat,
				$terezka$intervals$Intervals$getPrecision(interval),
				beginning + (m * interval));
			if (_Utils_cmp(nextPosition, range.D) > 0) {
				return acc;
			} else {
				var $temp$range = range,
					$temp$beginning = beginning,
					$temp$interval = interval,
					$temp$m = m + 1,
					$temp$acc = _Utils_ap(
					acc,
					_List_fromArray(
						[nextPosition]));
				range = $temp$range;
				beginning = $temp$beginning;
				interval = $temp$interval;
				m = $temp$m;
				acc = $temp$acc;
				continue positions;
			}
		}
	});
var $terezka$intervals$Intervals$values = F4(
	function (allowDecimals, exact, amountRough, range) {
		var intervalRough = (range.D - range.P) / amountRough;
		var interval = A3($terezka$intervals$Intervals$getInterval, intervalRough, allowDecimals, exact);
		var intervalSafe = (!interval) ? 1 : interval;
		var beginning = A2($terezka$intervals$Intervals$getBeginning, range.P, intervalSafe);
		var amountRoughSafe = (!amountRough) ? 1 : amountRough;
		return A5($terezka$intervals$Intervals$positions, range, beginning, intervalSafe, 0, _List_Nil);
	});
var $terezka$intervals$Intervals$floats = function (amount) {
	if (!amount.$) {
		var number = amount.a;
		return A3($terezka$intervals$Intervals$values, true, true, number);
	} else {
		var number = amount.a;
		return A3($terezka$intervals$Intervals$values, true, false, number);
	}
};
var $terezka$elm_charts$Internal$Svg$floats = F2(
	function (i, b) {
		return A2(
			$terezka$intervals$Intervals$floats,
			$terezka$intervals$Intervals$around(i),
			{D: b.D, P: b.P});
	});
var $terezka$elm_charts$Chart$Svg$floats = $terezka$elm_charts$Internal$Svg$floats;
var $ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {eg: toAmPm, ek: toMonthAbbreviation, el: toMonthName, ay: toOrdinalSuffix, eo: toWeekdayAbbreviation, ep: toWeekdayName};
	});
var $ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryannhg$date_format$DateFormat$Language$english = A6(
	$ryannhg$date_format$DateFormat$Language$Language,
	$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	$ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.bB, posixMinutes) < 0) {
					return posixMinutes + era.c;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.eg(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		bP: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		ce: month,
		cO: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).bP;
	});
var $ryannhg$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $elm$time$Time$Sun = 6;
var $elm$time$Time$Fri = 4;
var $elm$time$Time$Mon = 0;
var $elm$time$Time$Sat = 5;
var $elm$time$Time$Thu = 3;
var $elm$time$Time$Tue = 1;
var $elm$time$Time$Wed = 2;
var $ryannhg$date_format$DateFormat$days = _List_fromArray(
	[6, 0, 1, 2, 3, 4, 5]);
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return 3;
			case 1:
				return 4;
			case 2:
				return 5;
			case 3:
				return 6;
			case 4:
				return 0;
			case 5:
				return 1;
			default:
				return 2;
		}
	});
var $ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, 6),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryannhg$date_format$DateFormat$days)))));
	});
var $ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return $ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $elm$time$Time$Jan = 0;
var $elm$time$Time$Apr = 3;
var $elm$time$Time$Aug = 7;
var $elm$time$Time$Dec = 11;
var $elm$time$Time$Feb = 1;
var $elm$time$Time$Jul = 6;
var $elm$time$Time$Jun = 5;
var $elm$time$Time$Mar = 2;
var $elm$time$Time$May = 4;
var $elm$time$Time$Nov = 10;
var $elm$time$Time$Oct = 9;
var $elm$time$Time$Sep = 8;
var $ryannhg$date_format$DateFormat$months = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).ce;
		switch (_v0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var $ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryannhg$date_format$DateFormat$months))));
	});
var $ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).cO;
	});
var $ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryannhg$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$core$String$toUpper = _String_toUpper;
var $ryannhg$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryannhg$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 0:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 1:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ay(num));
				}(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 2:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 3:
				return language.ek(
					A2($elm$time$Time$toMonth, zone, posix));
			case 4:
				return language.el(
					A2($elm$time$Time$toMonth, zone, posix));
			case 17:
				return $elm$core$String$fromInt(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 18:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ay(num));
				}(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 5:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 6:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ay(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 7:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 8:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 9:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ay(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 10:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 11:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 12:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ay(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 13:
				return language.eo(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 14:
				return language.ep(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 19:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 20:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.ay(num));
				}(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 21:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 15:
				return A2(
					$elm$core$String$right,
					2,
					A2($ryannhg$date_format$DateFormat$year, zone, posix));
			case 16:
				return A2($ryannhg$date_format$DateFormat$year, zone, posix);
			case 22:
				return $elm$core$String$toUpper(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 23:
				return $elm$core$String$toLower(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 24:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 25:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 26:
				return $elm$core$String$fromInt(
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 27:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 28:
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 29:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 30:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 31:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 32:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 33:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 34:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 35:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryannhg$date_format$DateFormat$format = $ryannhg$date_format$DateFormat$formatWithLanguage($ryannhg$date_format$DateFormat$Language$english);
var $ryannhg$date_format$DateFormat$HourMilitaryFixed = {$: 25};
var $ryannhg$date_format$DateFormat$hourMilitaryFixed = $ryannhg$date_format$DateFormat$HourMilitaryFixed;
var $ryannhg$date_format$DateFormat$MinuteFixed = {$: 31};
var $ryannhg$date_format$DateFormat$minuteFixed = $ryannhg$date_format$DateFormat$MinuteFixed;
var $ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 36, a: a};
};
var $ryannhg$date_format$DateFormat$text = $ryannhg$date_format$DateFormat$Text;
var $terezka$elm_charts$Internal$Svg$formatClock = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed
		]));
var $ryannhg$date_format$DateFormat$MillisecondFixed = {$: 35};
var $ryannhg$date_format$DateFormat$millisecondFixed = $ryannhg$date_format$DateFormat$MillisecondFixed;
var $ryannhg$date_format$DateFormat$SecondFixed = {$: 33};
var $ryannhg$date_format$DateFormat$secondFixed = $ryannhg$date_format$DateFormat$SecondFixed;
var $terezka$elm_charts$Internal$Svg$formatClockMillis = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$secondFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$millisecondFixed
		]));
var $terezka$elm_charts$Internal$Svg$formatClockSecond = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$secondFixed
		]));
var $ryannhg$date_format$DateFormat$DayOfMonthNumber = {$: 5};
var $ryannhg$date_format$DateFormat$dayOfMonthNumber = $ryannhg$date_format$DateFormat$DayOfMonthNumber;
var $ryannhg$date_format$DateFormat$MonthNumber = {$: 0};
var $ryannhg$date_format$DateFormat$monthNumber = $ryannhg$date_format$DateFormat$MonthNumber;
var $terezka$elm_charts$Internal$Svg$formatDate = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$monthNumber,
			$ryannhg$date_format$DateFormat$text('/'),
			$ryannhg$date_format$DateFormat$dayOfMonthNumber
		]));
var $ryannhg$date_format$DateFormat$MonthNameAbbreviated = {$: 3};
var $ryannhg$date_format$DateFormat$monthNameAbbreviated = $ryannhg$date_format$DateFormat$MonthNameAbbreviated;
var $terezka$elm_charts$Internal$Svg$formatMonth = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$monthNameAbbreviated]));
var $ryannhg$date_format$DateFormat$DayOfWeekNameFull = {$: 14};
var $ryannhg$date_format$DateFormat$dayOfWeekNameFull = $ryannhg$date_format$DateFormat$DayOfWeekNameFull;
var $terezka$elm_charts$Internal$Svg$formatWeekday = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$dayOfWeekNameFull]));
var $ryannhg$date_format$DateFormat$YearNumber = {$: 16};
var $ryannhg$date_format$DateFormat$yearNumber = $ryannhg$date_format$DateFormat$YearNumber;
var $terezka$elm_charts$Internal$Svg$formatYear = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$yearNumber]));
var $terezka$elm_charts$Internal$Svg$formatTime = F2(
	function (zone, time) {
		var _v0 = A2($elm$core$Maybe$withDefault, time.er, time.c0);
		switch (_v0) {
			case 0:
				return A2($terezka$elm_charts$Internal$Svg$formatClockMillis, zone, time.ee);
			case 1:
				return A2($terezka$elm_charts$Internal$Svg$formatClockSecond, zone, time.ee);
			case 2:
				return A2($terezka$elm_charts$Internal$Svg$formatClock, zone, time.ee);
			case 3:
				return A2($terezka$elm_charts$Internal$Svg$formatClock, zone, time.ee);
			case 4:
				return (time.dG === 7) ? A2($terezka$elm_charts$Internal$Svg$formatWeekday, zone, time.ee) : A2($terezka$elm_charts$Internal$Svg$formatDate, zone, time.ee);
			case 5:
				return A2($terezka$elm_charts$Internal$Svg$formatMonth, zone, time.ee);
			default:
				return A2($terezka$elm_charts$Internal$Svg$formatYear, zone, time.ee);
		}
	});
var $terezka$elm_charts$Chart$Svg$formatTime = $terezka$elm_charts$Internal$Svg$formatTime;
var $terezka$elm_charts$Internal$Svg$generate = F3(
	function (amount, _v0, limits) {
		var func = _v0;
		return A2(func, amount, limits);
	});
var $terezka$elm_charts$Chart$Svg$generate = $terezka$elm_charts$Internal$Svg$generate;
var $terezka$intervals$Intervals$ints = F2(
	function (amount, range) {
		return A2(
			$elm$core$List$map,
			$elm$core$Basics$round,
			function () {
				if (!amount.$) {
					var number = amount.a;
					return A4($terezka$intervals$Intervals$values, false, true, number, range);
				} else {
					var number = amount.a;
					return A4($terezka$intervals$Intervals$values, false, false, number, range);
				}
			}());
	});
var $terezka$elm_charts$Internal$Svg$ints = F2(
	function (i, b) {
		return A2(
			$terezka$intervals$Intervals$ints,
			$terezka$intervals$Intervals$around(i),
			{D: b.D, P: b.P});
	});
var $terezka$elm_charts$Chart$Svg$ints = $terezka$elm_charts$Internal$Svg$ints;
var $terezka$intervals$Intervals$Day = 4;
var $terezka$intervals$Intervals$Hour = 3;
var $terezka$intervals$Intervals$Millisecond = 0;
var $terezka$intervals$Intervals$Minute = 2;
var $terezka$intervals$Intervals$Month = 5;
var $terezka$intervals$Intervals$Second = 1;
var $terezka$intervals$Intervals$Year = 6;
var $justinmimbs$time_extra$Time$Extra$Day = 11;
var $justinmimbs$date$Date$Days = 3;
var $justinmimbs$time_extra$Time$Extra$Millisecond = 15;
var $justinmimbs$time_extra$Time$Extra$Month = 2;
var $justinmimbs$date$Date$Months = 1;
var $justinmimbs$date$Date$RD = $elm$core$Basics$identity;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m) {
			case 0:
				return 0;
			case 1:
				return 31;
			case 2:
				return 59 + leapDays;
			case 3:
				return 90 + leapDays;
			case 4:
				return 120 + leapDays;
			case 5:
				return 151 + leapDays;
			case 6:
				return 181 + leapDays;
			case 7:
				return 212 + leapDays;
			case 8:
				return 243 + leapDays;
			case 9:
				return 273 + leapDays;
			case 10:
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m) {
			case 0:
				return 31;
			case 1:
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		default:
			return 11;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {bP: d, ce: m, cO: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0;
	var y = $justinmimbs$date$Date$year(rd);
	return {
		bp: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		cO: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0;
	var date = $justinmimbs$date$Date$toOrdinalDate(rd);
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.cO, 0, date.bp);
};
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0;
		switch (unit) {
			case 0:
				return A3($justinmimbs$date$Date$add, 1, 12 * n, rd);
			case 1:
				var date = $justinmimbs$date$Date$toCalendarDate(rd);
				var wholeMonths = ((12 * (date.cO - 1)) + ($justinmimbs$date$Date$monthToNumber(date.ce) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
					$elm$core$Basics$min,
					date.bP,
					A2($justinmimbs$date$Date$daysInMonth, y, m));
			case 2:
				return rd + (7 * n);
			default:
				return rd + n;
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
			$elm$core$Basics$clamp,
			1,
			A2($justinmimbs$date$Date$daysInMonth, y, m),
			d);
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval) {
				case 15:
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 14:
					var $temp$interval = 15,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 13:
					var $temp$interval = 15,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 12:
					var $temp$interval = 15,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 11:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							3,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 2:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							1,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 0:
					var $temp$interval = 2,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 1:
					var $temp$interval = 2,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 3:
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$Week = 3;
var $justinmimbs$date$Date$Day = 11;
var $justinmimbs$date$Date$Friday = 8;
var $justinmimbs$date$Date$Monday = 4;
var $justinmimbs$date$Date$Month = 2;
var $justinmimbs$date$Date$Quarter = 1;
var $justinmimbs$date$Date$Saturday = 9;
var $justinmimbs$date$Date$Sunday = 10;
var $justinmimbs$date$Date$Thursday = 7;
var $justinmimbs$date$Date$Tuesday = 5;
var $justinmimbs$date$Date$Wednesday = 6;
var $justinmimbs$date$Date$Week = 3;
var $justinmimbs$date$Date$Year = 0;
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1;
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$daysBeforeYear(y) + 1;
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.ce;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date;
		switch (interval) {
			case 0:
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 1:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 2:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 3:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 4:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 5:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 1, date);
			case 6:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 2, date);
			case 7:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 3, date);
			case 8:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 4, date);
			case 9:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 5, date);
			case 10:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 6, date);
			default:
				return date;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval) {
			case 15:
				return posix;
			case 14:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 13:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 12:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 11:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 11, zone, posix);
			case 2:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 2, zone, posix);
			case 0:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 0, zone, posix);
			case 1:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 1, zone, posix);
			case 3:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 3, zone, posix);
			case 4:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 4, zone, posix);
			case 5:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 5, zone, posix);
			case 6:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 6, zone, posix);
			case 7:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 7, zone, posix);
			case 8:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 8, zone, posix);
			case 9:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 9, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 10, zone, posix);
		}
	});
var $justinmimbs$time_extra$Time$Extra$ceiling = F3(
	function (interval, zone, posix) {
		var floored = A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, posix);
		return _Utils_eq(floored, posix) ? posix : A4($justinmimbs$time_extra$Time$Extra$add, interval, 1, zone, floored);
	});
var $terezka$intervals$Intervals$Time$ceilingDay = F3(
	function (zone, mult, stamp) {
		return (mult === 7) ? A3($justinmimbs$time_extra$Time$Extra$ceiling, 3, zone, stamp) : A3($justinmimbs$time_extra$Time$Extra$ceiling, 11, zone, stamp);
	});
var $justinmimbs$time_extra$Time$Extra$Hour = 12;
var $justinmimbs$time_extra$Time$Extra$partsToPosix = F2(
	function (zone, _v0) {
		var year = _v0.cO;
		var month = _v0.ce;
		var day = _v0.bP;
		var hour = _v0.a8;
		var minute = _v0.bj;
		var second = _v0.bt;
		var millisecond = _v0.bi;
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A3($justinmimbs$date$Date$fromCalendarDate, year, month, day),
			A4(
				$justinmimbs$time_extra$Time$Extra$timeFromClock,
				A3($elm$core$Basics$clamp, 0, 23, hour),
				A3($elm$core$Basics$clamp, 0, 59, minute),
				A3($elm$core$Basics$clamp, 0, 59, second),
				A3($elm$core$Basics$clamp, 0, 999, millisecond)));
	});
var $justinmimbs$time_extra$Time$Extra$posixToParts = F2(
	function (zone, posix) {
		return {
			bP: A2($elm$time$Time$toDay, zone, posix),
			a8: A2($elm$time$Time$toHour, zone, posix),
			bi: A2($elm$time$Time$toMillis, zone, posix),
			bj: A2($elm$time$Time$toMinute, zone, posix),
			ce: A2($elm$time$Time$toMonth, zone, posix),
			bt: A2($elm$time$Time$toSecond, zone, posix),
			cO: A2($elm$time$Time$toYear, zone, posix)
		};
	});
var $terezka$intervals$Intervals$Time$ceilingHour = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, 12, zone, stamp));
		var rem = parts.a8 % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, 12, mult - rem, zone, _new);
	});
var $justinmimbs$time_extra$Time$Extra$Minute = 13;
var $terezka$intervals$Intervals$Time$ceilingMinute = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, 13, zone, stamp));
		var rem = parts.bj % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, 13, mult - rem, zone, _new);
	});
var $terezka$intervals$Intervals$Time$intAsMonth = function (_int) {
	switch (_int) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		case 12:
			return 11;
		default:
			return 11;
	}
};
var $terezka$intervals$Intervals$Time$monthAsInt = function (month) {
	switch (month) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $terezka$intervals$Intervals$Time$ceilingMonth = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, 2, zone, stamp));
		var monthInt = $terezka$intervals$Intervals$Time$monthAsInt(parts.ce);
		var rem = (monthInt - 1) % mult;
		var newMonth = (!rem) ? monthInt : ((monthInt - rem) + mult);
		return A2(
			$justinmimbs$time_extra$Time$Extra$partsToPosix,
			zone,
			(newMonth > 12) ? _Utils_update(
				parts,
				{
					ce: $terezka$intervals$Intervals$Time$intAsMonth(newMonth - 12),
					cO: parts.cO + 1
				}) : _Utils_update(
				parts,
				{
					ce: $terezka$intervals$Intervals$Time$intAsMonth(newMonth)
				}));
	});
var $terezka$intervals$Intervals$Time$ceilingMs = F3(
	function (zone, mult, stamp) {
		var parts = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, stamp);
		var rem = parts.bi % mult;
		return (!rem) ? A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts) : A4($justinmimbs$time_extra$Time$Extra$add, 15, mult - rem, zone, stamp);
	});
var $justinmimbs$time_extra$Time$Extra$Second = 14;
var $terezka$intervals$Intervals$Time$ceilingSecond = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, 14, zone, stamp));
		var rem = parts.bt % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, 14, mult - rem, zone, _new);
	});
var $justinmimbs$time_extra$Time$Extra$Year = 0;
var $terezka$intervals$Intervals$Time$ceilingYear = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, 0, zone, stamp));
		var rem = parts.cO % mult;
		var newYear = (!rem) ? parts.cO : ((parts.cO - rem) + mult);
		return A2(
			$justinmimbs$time_extra$Time$Extra$partsToPosix,
			zone,
			_Utils_update(
				parts,
				{cO: newYear}));
	});
var $terezka$intervals$Intervals$Time$ceilingUnit = F3(
	function (zone, unit, mult) {
		switch (unit) {
			case 0:
				return A2($terezka$intervals$Intervals$Time$ceilingMs, zone, mult);
			case 1:
				return A2($terezka$intervals$Intervals$Time$ceilingSecond, zone, mult);
			case 2:
				return A2($terezka$intervals$Intervals$Time$ceilingMinute, zone, mult);
			case 3:
				return A2($terezka$intervals$Intervals$Time$ceilingHour, zone, mult);
			case 4:
				return A2($terezka$intervals$Intervals$Time$ceilingDay, zone, mult);
			case 5:
				return A2($terezka$intervals$Intervals$Time$ceilingMonth, zone, mult);
			default:
				return A2($terezka$intervals$Intervals$Time$ceilingYear, zone, mult);
		}
	});
var $terezka$intervals$Intervals$Time$Day = 4;
var $terezka$intervals$Intervals$Time$Hour = 3;
var $terezka$intervals$Intervals$Time$Millisecond = 0;
var $terezka$intervals$Intervals$Time$Minute = 2;
var $terezka$intervals$Intervals$Time$Month = 5;
var $terezka$intervals$Intervals$Time$Second = 1;
var $terezka$intervals$Intervals$Time$Year = 6;
var $terezka$intervals$Intervals$Time$getChange = F3(
	function (zone, a, b) {
		var bP = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b);
		var aP = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a);
		return (!_Utils_eq(aP.cO, bP.cO)) ? 6 : ((!_Utils_eq(aP.ce, bP.ce)) ? 5 : ((!_Utils_eq(aP.bP, bP.bP)) ? 4 : ((!_Utils_eq(aP.a8, bP.a8)) ? 3 : ((!_Utils_eq(aP.bj, bP.bj)) ? 2 : ((!_Utils_eq(aP.bt, bP.bt)) ? 1 : 0)))));
	});
var $danhandrea$elm_time_extra$Util$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 400, year)) || ((!(!A2($elm$core$Basics$modBy, 100, year))) && (!A2($elm$core$Basics$modBy, 4, year)));
};
var $danhandrea$elm_time_extra$Month$days = F2(
	function (year, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return $danhandrea$elm_time_extra$Util$isLeapYear(year) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $danhandrea$elm_time_extra$TimeExtra$daysInMonth = $danhandrea$elm_time_extra$Month$days;
var $terezka$intervals$Intervals$Time$toMs = $elm$time$Time$posixToMillis;
var $terezka$intervals$Intervals$Time$getDiff = F3(
	function (zone, a, b) {
		var _v0 = (_Utils_cmp(
			$terezka$intervals$Intervals$Time$toMs(a),
			$terezka$intervals$Intervals$Time$toMs(b)) < 0) ? _Utils_Tuple2(
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a),
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b)) : _Utils_Tuple2(
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b),
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a));
		var aP = _v0.a;
		var bP = _v0.b;
		var dMsX = bP.bi - aP.bi;
		var dMs = (dMsX < 0) ? (1000 + dMsX) : dMsX;
		var dSecondX = (bP.bt - aP.bt) + ((dMsX < 0) ? (-1) : 0);
		var dMinuteX = (bP.bj - aP.bj) + ((dSecondX < 0) ? (-1) : 0);
		var dHourX = (bP.a8 - aP.a8) + ((dMinuteX < 0) ? (-1) : 0);
		var dDayX = (bP.bP - aP.bP) + ((dHourX < 0) ? (-1) : 0);
		var dDay = (dDayX < 0) ? (A2($danhandrea$elm_time_extra$TimeExtra$daysInMonth, bP.cO, bP.ce) + dDayX) : dDayX;
		var dMonthX = ($terezka$intervals$Intervals$Time$monthAsInt(bP.ce) - $terezka$intervals$Intervals$Time$monthAsInt(aP.ce)) + ((dDayX < 0) ? (-1) : 0);
		var dMonth = (dMonthX < 0) ? (12 + dMonthX) : dMonthX;
		var dHour = (dHourX < 0) ? (24 + dHourX) : dHourX;
		var dMinute = (dMinuteX < 0) ? (60 + dMinuteX) : dMinuteX;
		var dSecond = (dSecondX < 0) ? (60 + dSecondX) : dSecondX;
		var dYearX = (bP.cO - aP.cO) + ((dMonthX < 0) ? (-1) : 0);
		var dYear = (dYearX < 0) ? ($terezka$intervals$Intervals$Time$monthAsInt(bP.ce) + dYearX) : dYearX;
		return {bP: dDay, a8: dHour, bi: dMs, bj: dMinute, ce: dMonth, bt: dSecond, cO: dYear};
	});
var $terezka$intervals$Intervals$Time$oneSecond = 1000;
var $terezka$intervals$Intervals$Time$oneMinute = $terezka$intervals$Intervals$Time$oneSecond * 60;
var $terezka$intervals$Intervals$Time$oneHour = $terezka$intervals$Intervals$Time$oneMinute * 60;
var $terezka$intervals$Intervals$Time$oneDay = $terezka$intervals$Intervals$Time$oneHour * 24;
var $terezka$intervals$Intervals$Time$oneMs = 1;
var $terezka$intervals$Intervals$Time$getNumOfTicks = F5(
	function (zone, unit, mult, a, b) {
		var div = F2(
			function (n1, n2) {
				return $elm$core$Basics$floor(n1 / n2);
			});
		var timeDiff = function (ms) {
			var ceiled = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, a);
			return (_Utils_cmp(
				$terezka$intervals$Intervals$Time$toMs(ceiled),
				$terezka$intervals$Intervals$Time$toMs(b)) > 0) ? (-1) : A2(
				div,
				A2(
					div,
					$terezka$intervals$Intervals$Time$toMs(b) - $terezka$intervals$Intervals$Time$toMs(ceiled),
					ms),
				mult);
		};
		var diff = function (property) {
			var ceiled = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, a);
			return (_Utils_cmp(
				$terezka$intervals$Intervals$Time$toMs(ceiled),
				$terezka$intervals$Intervals$Time$toMs(b)) > 0) ? (-1) : A2(
				div,
				property(
					A3($terezka$intervals$Intervals$Time$getDiff, zone, ceiled, b)),
				mult);
		};
		switch (unit) {
			case 0:
				return timeDiff($terezka$intervals$Intervals$Time$oneMs) + 1;
			case 1:
				return timeDiff($terezka$intervals$Intervals$Time$oneSecond) + 1;
			case 2:
				return timeDiff($terezka$intervals$Intervals$Time$oneMinute) + 1;
			case 3:
				return timeDiff($terezka$intervals$Intervals$Time$oneHour) + 1;
			case 4:
				return timeDiff($terezka$intervals$Intervals$Time$oneDay) + 1;
			case 5:
				return diff(
					function (d) {
						return d.ce + (d.cO * 12);
					}) + 1;
			default:
				return diff(
					function ($) {
						return $.cO;
					}) + 1;
		}
	});
var $terezka$intervals$Intervals$Time$largerUnit = function (unit) {
	switch (unit) {
		case 0:
			return $elm$core$Maybe$Just(1);
		case 1:
			return $elm$core$Maybe$Just(2);
		case 2:
			return $elm$core$Maybe$Just(3);
		case 3:
			return $elm$core$Maybe$Just(4);
		case 4:
			return $elm$core$Maybe$Just(5);
		case 5:
			return $elm$core$Maybe$Just(6);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $terezka$intervals$Intervals$Time$niceMultiples = function (unit) {
	switch (unit) {
		case 0:
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500]);
		case 1:
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 2:
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 3:
			return _List_fromArray(
				[1, 2, 3, 4, 6, 8, 12]);
		case 4:
			return _List_fromArray(
				[1, 2, 3, 7, 14]);
		case 5:
			return _List_fromArray(
				[1, 2, 3, 4, 6]);
		default:
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 10000, 1000000, 10000000]);
	}
};
var $terezka$intervals$Intervals$Time$toBestUnit = F4(
	function (zone, amount, min, max) {
		var toNice = function (unit) {
			toNice:
			while (true) {
				var niceNums = $terezka$intervals$Intervals$Time$niceMultiples(unit);
				var maybeNiceNum = A2(
					$elm$core$List$filter,
					function (n) {
						return _Utils_cmp(
							A5($terezka$intervals$Intervals$Time$getNumOfTicks, zone, unit, n, min, max),
							amount) < 1;
					},
					niceNums);
				var div = F2(
					function (n1, n2) {
						return $elm$core$Basics$ceiling(n1 / n2);
					});
				var _v0 = $elm$core$List$head(maybeNiceNum);
				if (!_v0.$) {
					var niceNum = _v0.a;
					return _Utils_Tuple2(unit, niceNum);
				} else {
					var _v1 = $terezka$intervals$Intervals$Time$largerUnit(unit);
					if (!_v1.$) {
						var larger = _v1.a;
						var $temp$unit = larger;
						unit = $temp$unit;
						continue toNice;
					} else {
						return _Utils_Tuple2(6, 100000000);
					}
				}
			}
		};
		return toNice(0);
	});
var $terezka$intervals$Intervals$Time$toExtraUnit = function (unit) {
	switch (unit) {
		case 0:
			return 15;
		case 1:
			return 14;
		case 2:
			return 13;
		case 3:
			return 12;
		case 4:
			return 11;
		case 5:
			return 2;
		default:
			return 0;
	}
};
var $terezka$intervals$Intervals$Time$unitToInt = function (unit) {
	switch (unit) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		case 3:
			return 3;
		case 4:
			return 4;
		case 5:
			return 5;
		default:
			return 6;
	}
};
var $terezka$intervals$Intervals$Time$values = F4(
	function (zone, maxMmount, min, max) {
		var _v0 = A4($terezka$intervals$Intervals$Time$toBestUnit, zone, maxMmount, min, max);
		var unit = _v0.a;
		var mult = _v0.b;
		var amount = A5($terezka$intervals$Intervals$Time$getNumOfTicks, zone, unit, mult, min, max);
		var initial = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, min);
		var tUnit = $terezka$intervals$Intervals$Time$toExtraUnit(unit);
		var toTick = F3(
			function (x, timestamp, change) {
				return {
					c0: (_Utils_cmp(
						$terezka$intervals$Intervals$Time$unitToInt(change),
						$terezka$intervals$Intervals$Time$unitToInt(unit)) > 0) ? $elm$core$Maybe$Just(change) : $elm$core$Maybe$Nothing,
					bf: !x,
					dG: mult,
					ee: timestamp,
					er: unit,
					bH: zone
				};
			});
		var toTicks = F2(
			function (xs, acc) {
				toTicks:
				while (true) {
					if (xs.b) {
						var x = xs.a;
						var rest = xs.b;
						var prev = A4($justinmimbs$time_extra$Time$Extra$add, tUnit, (x - 1) * mult, zone, initial);
						var curr = A4($justinmimbs$time_extra$Time$Extra$add, tUnit, x * mult, zone, initial);
						var change = A3($terezka$intervals$Intervals$Time$getChange, zone, prev, curr);
						var $temp$xs = rest,
							$temp$acc = A2(
							$elm$core$List$cons,
							A3(toTick, x, curr, change),
							acc);
						xs = $temp$xs;
						acc = $temp$acc;
						continue toTicks;
					} else {
						return acc;
					}
				}
			});
		return $elm$core$List$reverse(
			A2(
				toTicks,
				A2($elm$core$List$range, 0, amount - 1),
				_List_Nil));
	});
var $terezka$intervals$Intervals$times = F3(
	function (zone, amount, range) {
		var toUnit = function (unit) {
			switch (unit) {
				case 0:
					return 0;
				case 1:
					return 1;
				case 2:
					return 2;
				case 3:
					return 3;
				case 4:
					return 4;
				case 5:
					return 5;
				default:
					return 6;
			}
		};
		var translateUnit = function (time) {
			return {
				c0: A2($elm$core$Maybe$map, toUnit, time.c0),
				bf: time.bf,
				dG: time.dG,
				ee: time.ee,
				er: toUnit(time.er),
				bH: time.bH
			};
		};
		var fromMs = function (ts) {
			return $elm$time$Time$millisToPosix(
				$elm$core$Basics$round(ts));
		};
		return A2(
			$elm$core$List$map,
			translateUnit,
			A4(
				$terezka$intervals$Intervals$Time$values,
				zone,
				amount,
				fromMs(range.P),
				fromMs(range.D)));
	});
var $terezka$elm_charts$Internal$Svg$times = function (zone) {
	return F2(
		function (i, b) {
			return A3(
				$terezka$intervals$Intervals$times,
				zone,
				i,
				{D: b.D, P: b.P});
		});
};
var $terezka$elm_charts$Chart$Svg$times = $terezka$elm_charts$Internal$Svg$times;
var $terezka$elm_charts$Chart$generateValues = F4(
	function (amount, tick, maybeFormat, axis) {
		var toTickValues = F2(
			function (toValue, toString) {
				return $elm$core$List$map(
					function (i) {
						return {
							aT: function () {
								if (!maybeFormat.$) {
									var formatter = maybeFormat.a;
									return formatter(
										toValue(i));
								} else {
									return toString(i);
								}
							}(),
							aa: toValue(i)
						};
					});
			});
		switch (tick.$) {
			case 0:
				return A3(
					toTickValues,
					$elm$core$Basics$identity,
					$elm$core$String$fromFloat,
					A3($terezka$elm_charts$Chart$Svg$generate, amount, $terezka$elm_charts$Chart$Svg$floats, axis));
			case 1:
				return A3(
					toTickValues,
					$elm$core$Basics$toFloat,
					$elm$core$String$fromInt,
					A3($terezka$elm_charts$Chart$Svg$generate, amount, $terezka$elm_charts$Chart$Svg$ints, axis));
			default:
				var zone = tick.a;
				return A3(
					toTickValues,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Basics$toFloat, $elm$time$Time$posixToMillis),
						function ($) {
							return $.ee;
						}),
					$terezka$elm_charts$Chart$Svg$formatTime(zone),
					A3(
						$terezka$elm_charts$Chart$Svg$generate,
						amount,
						$terezka$elm_charts$Chart$Svg$times(zone),
						axis));
		}
	});
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $terezka$elm_charts$Internal$Svg$position = F6(
	function (plane, rotation, x_, y_, xOff_, yOff_) {
		return $elm$svg$Svg$Attributes$transform(
			'translate(' + ($elm$core$String$fromFloat(
				A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x_) + xOff_) + (',' + ($elm$core$String$fromFloat(
				A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y_) + yOff_) + (') rotate(' + ($elm$core$String$fromFloat(rotation) + ')'))))));
	});
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$tspan = $elm$svg$Svg$trustedNode('tspan');
var $terezka$elm_charts$Internal$Svg$label = F4(
	function (plane, config, inner, point) {
		var _v0 = config.m;
		if (_v0.$ === 1) {
			var withOverflowWrap = function (el) {
				return config.o ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_fromArray(
						[el])) : el;
			};
			var uppercaseStyle = config.s ? 'text-transform: uppercase;' : '';
			var fontStyle = function () {
				var _v5 = config.n;
				if (!_v5.$) {
					var size_ = _v5.a;
					return 'font-size: ' + ($elm$core$String$fromInt(size_) + 'px;');
				} else {
					return '';
				}
			}();
			var anchorStyle = function () {
				var _v1 = config.l;
				if (_v1.$ === 1) {
					return 'text-anchor: middle;';
				} else {
					switch (_v1.a) {
						case 0:
							var _v2 = _v1.a;
							return 'text-anchor: end;';
						case 1:
							var _v3 = _v1.a;
							return 'text-anchor: start;';
						default:
							var _v4 = _v1.a;
							return 'text-anchor: middle;';
					}
				}
			}();
			return withOverflowWrap(
				A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.f,
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__label'),
							$elm$svg$Svg$Attributes$stroke(config.A),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromFloat(config.C)),
							$elm$svg$Svg$Attributes$fill(config.b),
							A6($terezka$elm_charts$Internal$Svg$position, plane, -config.r, point.cM, point.cN, config.j, config.k),
							$elm$svg$Svg$Attributes$style(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									['pointer-events: none;', fontStyle, anchorStyle, uppercaseStyle])))
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$tspan, _List_Nil, inner)
						])));
		} else {
			var ellipsis = _v0.a;
			var xOffWithAnchor = function () {
				var _v11 = config.l;
				if (_v11.$ === 1) {
					return config.j - (ellipsis.cL / 2);
				} else {
					switch (_v11.a) {
						case 0:
							var _v12 = _v11.a;
							return config.j - ellipsis.cL;
						case 1:
							var _v13 = _v11.a;
							return config.j;
						default:
							var _v14 = _v11.a;
							return config.j - (ellipsis.cL / 2);
					}
				}
			}();
			var withOverflowWrap = function (el) {
				return config.o ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_fromArray(
						[el])) : el;
			};
			var uppercaseStyle = config.s ? A2($elm$html$Html$Attributes$style, 'text-transform', 'uppercase') : A2($elm$html$Html$Attributes$style, '', '');
			var fontStyle = function () {
				var _v10 = config.n;
				if (!_v10.$) {
					var size_ = _v10.a;
					return A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt(size_) + 'px');
				} else {
					return A2($elm$html$Html$Attributes$style, '', '');
				}
			}();
			var anchorStyle = function () {
				var _v6 = config.l;
				if (_v6.$ === 1) {
					return A2($elm$html$Html$Attributes$style, 'text-align', 'center');
				} else {
					switch (_v6.a) {
						case 0:
							var _v7 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'right');
						case 1:
							var _v8 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'left');
						default:
							var _v9 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'center');
					}
				}
			}();
			return withOverflowWrap(
				A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.f,
					$elm$svg$Svg$foreignObject,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__label'),
							$elm$svg$Svg$Attributes$class('elm-charts__html-label'),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromFloat(ellipsis.cL)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromFloat(ellipsis.$7)),
							A6($terezka$elm_charts$Internal$Svg$position, plane, -config.r, point.cM, point.cN, xOffWithAnchor, config.k - 10)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'xmlns', 'http://www.w3.org/1999/xhtml'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
									A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
									A2($elm$html$Html$Attributes$style, 'text-overflow', 'ellipsis'),
									A2($elm$html$Html$Attributes$style, 'height', '100%'),
									A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
									A2($elm$html$Html$Attributes$style, 'color', config.b),
									fontStyle,
									uppercaseStyle,
									anchorStyle
								]),
							inner)
						])));
		}
	});
var $terezka$elm_charts$Chart$Attributes$zero = function (b) {
	return A3($elm$core$Basics$clamp, b.P, b.D, 0);
};
var $terezka$elm_charts$Chart$yLabels = function (edits) {
	var toTicks = F2(
		function (p, config) {
			return A4(
				$terezka$elm_charts$Chart$generateValues,
				config.R,
				config.T,
				config.K,
				A3(
					$elm$core$List$foldl,
					F2(
						function (f, y) {
							return f(y);
						}),
					p.cN,
					config.x));
		});
	var toTickValues = F3(
		function (p, config, ts) {
			return (!config.i) ? ts : _Utils_update(
				ts,
				{
					Q: _Utils_ap(
						ts.Q,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.aa;
							},
							A2(toTicks, p, config)))
				});
		});
	var toConfig = function (p) {
		return A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{R: 5, l: $elm$core$Maybe$Nothing, f: _List_Nil, b: '#808BAB', m: $elm$core$Maybe$Nothing, h: false, n: $elm$core$Maybe$Nothing, K: $elm$core$Maybe$Nothing, T: $terezka$elm_charts$Internal$Svg$Floats, i: false, o: false, x: _List_Nil, q: $terezka$elm_charts$Chart$Attributes$zero, r: 0, s: false, j: -10, k: 3});
	};
	return A3(
		$terezka$elm_charts$Chart$LabelsElement,
		toConfig,
		toTickValues,
		F2(
			function (p, config) {
				var _default = $terezka$elm_charts$Internal$Svg$defaultLabel;
				var toLabel = function (item) {
					return A4(
						$terezka$elm_charts$Internal$Svg$label,
						p,
						_Utils_update(
							_default,
							{
								l: function () {
									var _v0 = config.l;
									if (_v0.$ === 1) {
										return $elm$core$Maybe$Just(
											config.h ? 1 : 0);
									} else {
										var anchor = _v0.a;
										return $elm$core$Maybe$Just(anchor);
									}
								}(),
								f: config.f,
								b: config.b,
								m: config.m,
								n: config.n,
								o: config.o,
								r: config.r,
								s: config.s,
								j: config.h ? (-config.j) : config.j,
								k: config.k
							}),
						_List_fromArray(
							[
								$elm$svg$Svg$text(item.aT)
							]),
						{
							cM: config.q(p.cM),
							cN: item.aa
						});
				};
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__y-labels')
						]),
					A2(
						$elm$core$List$map,
						toLabel,
						A2(toTicks, p, config)));
			}));
};
var $author$project$Charts$logs = function (data) {
	return A2(
		$terezka$elm_charts$Chart$chart,
		_List_fromArray(
			[
				$terezka$elm_charts$Chart$Attributes$height(200),
				$terezka$elm_charts$Chart$Attributes$width(600),
				$terezka$elm_charts$Chart$Attributes$margin(
				{cY: 10, dz: 10, d$: 10, eq: 10}),
				$terezka$elm_charts$Chart$Attributes$domain(
				_List_fromArray(
					[
						A2($terezka$elm_charts$Chart$Attributes$lowest, 0, $terezka$elm_charts$Chart$Attributes$orLower),
						A2($terezka$elm_charts$Chart$Attributes$highest, 6, $terezka$elm_charts$Chart$Attributes$orHigher)
					]))
			]),
		_List_fromArray(
			[
				$terezka$elm_charts$Chart$yLabels(
				_List_fromArray(
					[$terezka$elm_charts$Chart$Attributes$withGrid])),
				A3(
				$terezka$elm_charts$Chart$bars,
				_List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$margin(0.02)
					]),
				_List_fromArray(
					[
						A2(
						$terezka$elm_charts$Chart$bar,
						function (_v0) {
							var guesses = _v0.dn;
							var victory = _v0.eu;
							return victory ? guesses : 0;
						},
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$color($terezka$elm_charts$Chart$Attributes$blue)
							]))
					]),
				data)
			]));
};
var $author$project$Main$progressBar = function (percent) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('progress')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('progress-bar bg-success'),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$elm$core$String$fromFloat(percent) + '%')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$small = _VirtualDom_node('small');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$th = _VirtualDom_node('th');
var $author$project$Main$viewLangStats = F2(
	function (lang, langLogs) {
		var totalPlayed = $elm$core$List$length(langLogs);
		var onlyVictories = $elm$core$List$filter(
			function ($) {
				return $.eu;
			});
		var totalGuesses = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.dn;
				},
				onlyVictories(langLogs)));
		var totalWins = $elm$core$List$length(
			onlyVictories(langLogs));
		var percentWin = (totalWins / totalPlayed) * 100;
		var row = function (nbGuess) {
			var wins = $elm$core$List$length(
				A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeR,
						function ($) {
							return $.dn;
						},
						$elm$core$Basics$eq(nbGuess)),
					onlyVictories(langLogs)));
			var percent = (wins / totalWins) * 100;
			return A2(
				$elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$th,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-end')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(nbGuess))
							])),
						A2(
						$elm$html$Html$td,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-end')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(wins))
							])),
						A2(
						$elm$html$Html$td,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-end')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Main$formatPercent(percent))
							])),
						A2(
						$elm$html$Html$td,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-100')
							]),
						_List_fromArray(
							[
								$author$project$Main$progressBar(percent)
							]))
					]));
		};
		var guessAvg = totalGuesses / totalWins;
		var chartLogs = A2(
			$elm$core$List$take,
			100,
			$elm$core$List$reverse(langLogs));
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-group mb-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card py-0')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-body text-center')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('fs-3')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$elm$core$String$fromInt(totalPlayed))
											])),
										A2(
										$elm$html$Html$small,
										_List_Nil,
										_List_fromArray(
											[
												A2(
												$author$project$I18n$htmlText,
												lang,
												$author$project$I18n$StatsGamesPlayed(
													{ac: lang}))
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card py-0')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-body text-center')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('fs-3')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$author$project$Main$formatPercent(percentWin))
											])),
										A2(
										$elm$html$Html$small,
										_List_Nil,
										_List_fromArray(
											[
												A2($author$project$I18n$htmlText, lang, $author$project$I18n$StatsWinRate)
											]))
									]))
							])),
						(guessAvg > 0) ? A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card py-0')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('card-body text-center')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('fs-3')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												A2($author$project$Main$formatFloat, 2, guessAvg))
											])),
										A2(
										$elm$html$Html$small,
										_List_Nil,
										_List_fromArray(
											[
												A2($author$project$I18n$htmlText, lang, $author$project$I18n$StatsAverageGuesses)
											]))
									]))
							])) : $elm$html$Html$text('')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('table-responsive')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('fs-5')
							]),
						_List_fromArray(
							[
								A2(
								$author$project$I18n$htmlText,
								lang,
								$author$project$I18n$StatsGuessDistribution(
									{ac: lang}))
							])),
						A2(
						$elm$html$Html$table,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('table')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$tbody,
								_List_Nil,
								A2(
									$elm$core$List$map,
									row,
									A2($elm$core$List$range, 1, 6)))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('fs-5')
							]),
						_List_fromArray(
							[
								A2(
								$author$project$I18n$htmlText,
								lang,
								$author$project$I18n$StatsGuessEvolution(
									{ac: lang}))
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$author$project$I18n$htmlText,
								lang,
								$author$project$I18n$StatsGuessEvolutionHelp(
									{
										ac: lang,
										dA: $elm$core$List$length(chartLogs)
									}))
							])),
						$author$project$Charts$logs(chartLogs)
					]))
			]);
	});
var $author$project$Main$viewStats = function (_v0) {
	var lang = _v0.ac;
	var logs = _v0.as;
	var _v1 = A2(
		$elm$core$List$filter,
		A2(
			$elm$core$Basics$composeR,
			function ($) {
				return $.ac;
			},
			$elm$core$Basics$eq(lang)),
		logs);
	if (!_v1.b) {
		return _List_fromArray(
			[
				A2(
				$author$project$I18n$htmlText,
				lang,
				$author$project$I18n$StatsLangDataMissing(
					{ac: lang}))
			]);
	} else {
		var logs_ = _v1;
		return A2($author$project$Main$viewLangStats, lang, logs_);
	}
};
var $author$project$Main$layout = F2(
	function (model, content) {
		var store = model.Y;
		var modal = model.au;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$main_,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('Game')
						]),
					A2(
						$elm$core$List$cons,
						$author$project$Main$viewHeader(model),
						content)),
					function () {
					if (!modal.$) {
						if (!modal.a) {
							var _v1 = modal.a;
							return A3(
								$author$project$Main$viewModal,
								store,
								$author$project$I18n$Help,
								$author$project$Main$viewHelp(store));
						} else {
							var _v2 = modal.a;
							return A3(
								$author$project$Main$viewModal,
								store,
								$author$project$I18n$StatsLang(
									{ac: store.ac}),
								$author$project$Main$viewStats(store));
						}
					} else {
						return $elm$html$Html$text('');
					}
				}()
				]));
	});
var $elm$core$String$fromList = _String_fromList;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $author$project$Main$viewBoardElement = $elm$html$Html$div(
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('Board'),
			A2(
			$elm$html$Html$Attributes$style,
			'grid-template-rows',
			A2(
				$lukewestby$elm_string_interpolate$String$Interpolate$interpolate,
				'repeat({0}, 1fr)',
				_List_fromArray(
					[
						$elm$core$String$fromInt($author$project$Main$maxAttempts)
					])))
		]));
var $elm_community$list_extra$List$Extra$initialize = F2(
	function (n, f) {
		var step = F2(
			function (i, acc) {
				step:
				while (true) {
					if (i < 0) {
						return acc;
					} else {
						var $temp$i = i - 1,
							$temp$acc = A2(
							$elm$core$List$cons,
							f(i),
							acc);
						i = $temp$i;
						acc = $temp$acc;
						continue step;
					}
				}
			});
		return A2(step, n - 1, _List_Nil);
	});
var $author$project$Main$viewInput = function (input) {
	var chars = $elm$core$String$toList(input);
	var spots = _Utils_ap(
		chars,
		A2(
			$elm_community$list_extra$List$Extra$initialize,
			$author$project$Main$numberOfLetters - $elm$core$List$length(chars),
			$elm$core$Basics$always('\u00A0')));
	return $author$project$Main$viewBoardRow(
		A2(
			$elm$core$List$map,
			$author$project$Main$viewTile('btn-secondary'),
			spots));
};
var $author$project$Main$viewBoard = F2(
	function (input, guesses) {
		var remaining = ($author$project$Main$maxAttempts - $elm$core$List$length(guesses)) - A2(
			$elm$core$Maybe$withDefault,
			1,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Basics$always(2),
				input));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('BoardContainer'),
					$elm$html$Html$Attributes$id('board-container')
				]),
			_List_fromArray(
				[
					$author$project$Main$viewBoardElement(
					A2(
						$elm$core$List$filterMap,
						$elm$core$Basics$identity,
						$elm$core$List$concat(
							_List_fromArray(
								[
									A2(
									$elm$core$List$map,
									A2($elm$core$Basics$composeR, $author$project$Main$viewAttempt, $elm$core$Maybe$Just),
									$elm$core$List$reverse(guesses)),
									_List_fromArray(
									[
										A2($elm$core$Maybe$map, $author$project$Main$viewInput, input)
									]),
									A2(
									$elm$core$List$map,
									function (_v0) {
										return $elm$core$Maybe$Just(
											$author$project$Main$viewInput(
												$elm$core$String$fromList(
													A2($elm$core$List$repeat, $author$project$Main$numberOfLetters, '\u00A0'))));
									},
									A2($elm$core$List$range, 0, remaining))
								]))))
				]));
	});
var $author$project$I18n$DecodeError = {$: 1};
var $author$project$I18n$LoadError = {$: 16};
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$Main$viewError = F2(
	function (lang, error) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('alert alert-danger m-3')
				]),
			_List_fromArray(
				[
					function () {
					if (!error.$) {
						var details = error.a;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$p,
									_List_Nil,
									_List_fromArray(
										[
											A2($author$project$I18n$htmlText, lang, $author$project$I18n$DecodeError)
										])),
									A2(
									$elm$html$Html$pre,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('pb-3')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(details)
										]))
								]));
					} else {
						return A2($author$project$I18n$htmlText, lang, $author$project$I18n$LoadError);
					}
				}()
				]));
	});
var $author$project$Main$dispositions = function (lang) {
	return A2(
		$elm$core$List$map,
		$elm$core$String$toList,
		function () {
			if (lang === 1) {
				return _List_fromArray(
					['azertyuiop', 'qsdfghjklm', '⏎wxcvbn⌫']);
			} else {
				return _List_fromArray(
					['qwertyuiop', 'asdfghjkl', '⏎zxcvbnm⌫']);
			}
		}());
};
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $author$project$Main$keyState = F2(
	function (guesses, _char) {
		return _Utils_Tuple2(
			_char,
			A2(
				$elm$core$List$any,
				$elm$core$List$any(
					A2($author$project$Main$letterIs, $author$project$Main$Correct, _char)),
				guesses) ? $elm$core$Maybe$Just(
				$author$project$Main$Correct(_char)) : (A2(
				$elm$core$List$any,
				$elm$core$List$any(
					A2($author$project$Main$letterIs, $author$project$Main$Misplaced, _char)),
				guesses) ? $elm$core$Maybe$Just(
				$author$project$Main$Misplaced(_char)) : (A2(
				$elm$core$List$any,
				$elm$core$List$any(
					A2($author$project$Main$letterIs, $author$project$Main$Unused, _char)),
				guesses) ? $elm$core$Maybe$Just(
				$author$project$Main$Unused(_char)) : $elm$core$Maybe$Nothing)));
	});
var $author$project$Main$viewKeyState = function (_v0) {
	var _char = _v0.a;
	var letter = _v0.b;
	var baseClasses = 'KeyboardKey btn';
	var _v1 = function () {
		_v2$3:
		while (true) {
			if (!letter.$) {
				switch (letter.a.$) {
					case 1:
						return _Utils_Tuple2(
							'btn-success',
							$author$project$Main$KeyPressed(_char));
					case 2:
						return _Utils_Tuple2(
							'btn-warning',
							$author$project$Main$KeyPressed(_char));
					case 0:
						return _Utils_Tuple2(
							'bg-dark text-light',
							$author$project$Main$KeyPressed(_char));
					default:
						break _v2$3;
				}
			} else {
				break _v2$3;
			}
		}
		return (_char === '⌫') ? _Utils_Tuple2('btn-info large-key', $author$project$Main$BackSpace) : ((_char === '⏎') ? _Utils_Tuple2('btn-info large-key', $author$project$Main$Submit) : _Utils_Tuple2(
			'btn-secondary',
			$author$project$Main$KeyPressed(_char)));
	}();
	var classes = _v1.a;
	var msg = _v1.b;
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class(
				A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[baseClasses, classes]))),
				$elm$html$Html$Events$onClick(msg)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				$author$project$Main$charToText(_char))
			]));
};
var $author$project$Main$viewKeyboard = F2(
	function (lang, guesses) {
		return A2(
			$elm$html$Html$footer,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('Keyboard')
				]),
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeL,
					$elm$html$Html$div(
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('KeyboardRow')
							])),
					$elm$core$List$map(
						A2(
							$elm$core$Basics$composeR,
							$author$project$Main$keyState(guesses),
							$author$project$Main$viewKeyState))),
				$author$project$Main$dispositions(lang)));
	});
var $author$project$Main$view = function (model) {
	var store = model.Y;
	var state = model.z;
	return A2(
		$author$project$Main$layout,
		model,
		function () {
			switch (state.$) {
				case 0:
					return _List_fromArray(
						[
							A2($author$project$I18n$htmlText, store.ac, $author$project$I18n$GameLoading)
						]);
				case 1:
					var error = state.a;
					return _List_fromArray(
						[
							A2($author$project$Main$viewError, store.ac, error),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('text-center')
								]),
							_List_fromArray(
								[
									$author$project$Main$newGameButton(store.ac)
								]))
						]);
				case 4:
					var word = state.a;
					var guesses = state.b;
					return _List_fromArray(
						[
							A2($author$project$Main$viewBoard, $elm$core$Maybe$Nothing, guesses),
							A2($author$project$Main$endGameButtons, store.ac, word),
							A2($author$project$Main$viewKeyboard, store.ac, guesses),
							A2(
							$author$project$Main$alert,
							'success',
							A2($author$project$I18n$translate, store.ac, $author$project$I18n$GameWin))
						]);
				case 3:
					var word = state.a;
					var guesses = state.b;
					return _List_fromArray(
						[
							A2(
							$author$project$Main$viewBoard,
							$elm$core$Maybe$Nothing,
							function (a) {
								return A2($elm$core$List$cons, a, guesses);
							}(
								A2(
									$elm$core$List$map,
									$author$project$Main$Correct,
									$elm$core$String$toList(word)))),
							A2($author$project$Main$endGameButtons, store.ac, word),
							A2($author$project$Main$viewKeyboard, store.ac, guesses),
							A2(
							$author$project$Main$alert,
							'info',
							A2($author$project$I18n$translate, store.ac, $author$project$I18n$GameLost))
						]);
				default:
					var guesses = state.b;
					var input = state.c;
					var error = state.d;
					return _List_fromArray(
						[
							A2(
							$author$project$Main$viewBoard,
							$elm$core$Maybe$Just(input),
							guesses),
							A2(
							$elm$core$Maybe$withDefault,
							$elm$html$Html$text(''),
							A2(
								$elm$core$Maybe$map,
								$author$project$Main$alert('warning'),
								error)),
							A2($author$project$Main$viewKeyboard, store.ac, guesses)
						]);
			}
		}());
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{dv: $author$project$Main$init, d9: $author$project$Main$subscriptions, es: $author$project$Main$update, ev: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (rawStore) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (lang) {
					return $elm$json$Json$Decode$succeed(
						{ac: lang, br: rawStore});
				},
				A2($elm$json$Json$Decode$field, 'lang', $elm$json$Json$Decode$string));
		},
		A2($elm$json$Json$Decode$field, 'rawStore', $elm$json$Json$Decode$string)))(0)}});}(this));