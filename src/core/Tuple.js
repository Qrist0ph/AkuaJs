function _T(elements, payload) {
    if (!elements) {
        console.log("dd");
    }
    this.elements = elements.sort(function (a, b) {
        return a.Dimension.compareTo(b.Dimension);
    });
    this.Length = elements.length;
    this.Permutation = Enumerable.Range(0, this.Length).ToArray();
    this.Payload = payload ? payload : 0;
}
_T.prototype.toString = function () {
    s = 'T([';

    s += this.elements.join(",");
    s = s + ']';
    s = s + ')';
    return s;
}

_T.prototype.ToAkuaDsl = function () {
    s = 'T([';

    s += this.elements.join(",");
    s = s + ']';
    if (this.Payload) {
        s += ',' + this.Payload;
    }
    s = s + ')';
    return s;
}

_T.prototype.Domain = function () {
    this._Domain = this._Domain ? this._Domain : Domain(Enumerable.From(this.elements).Select(function (el) { return el.Dimension; }).ToArray());
    return this._Domain;
};

_T.prototype.ToCaption = function () {
    s = '';
    for (var i = 0; i < this.elements.length; i++) {
        s += (this.elements[i].Caption);
        if (i != this.elements.length - 1) {
            s += ',';
        }

    }

    return s + '';

    //return elements.join(",");
}

_T.prototype.equals = function (obj) {
    // return  (obj instanceof _T) &&  arraysEqualHash(this.elements, obj.elements);
    return  arraysEqualHash(this.elements, obj.elements);
};

_T.prototype.And = function (otherTuple) {
    return AndTupleElements(false, this.elements, otherTuple.elements);
}



_T.prototype.IsSubsetOf = function (otherTuple) {
    var projection = GetProjectionForOrderedSets(this.Domain().Dimensions, otherTuple.Domain().Dimensions);
    if (projection.length / 2 != this.elements.length) return false;

    var subset = true;
    for (var i = 0; i < projection.length / 2; i++) {
        //falls sich die Filter und CubeTuple schneiden
        if (this.elements[projection[2 * i]].equals(otherTuple.elements[projection[2 * i + 1]])) continue;
        subset = false;
        break;
    }
    return subset;
}


//-------------------------------

function AndTupleElements(overwrite, rightTuple, leftTuple) {

    if (rightTuple.length == 0) {
        return T(leftTuple);
    }
    if (leftTuple.length == 0) {
        return T(rightTuple);
    }

    var newTuple = new Array(leftTuple.length + rightTuple.length);
    var count = 0;
    var lCount = 0;
    var rCount = 0;

    while (lCount < leftTuple.length || rCount < rightTuple.length) {
        var left = lCount < leftTuple.length ? leftTuple[lCount] : null;
        var right = rCount < rightTuple.length ? rightTuple[rCount] : null;

        if (left == null) {
            newTuple[count++] = right;
            rCount++;
            continue;
        }
        if (right == null) {
            newTuple[count++] = left;
            lCount++;
            continue;
        }

        if (left.Dimension.compareTo(right.Dimension) == -1) {
            newTuple[count++] = left;
            lCount++;
            continue;
        }
        //>
        if (left.Dimension.compareTo(right.Dimension) == 1) {
            newTuple[count++] = right;
            rCount++;
            continue;
        }
        //falls gleiche Dimension and dieser stelle

        //falls elemente identisch
        if (left.equals(right)) {
            newTuple[count++] = left;
            lCount++;
            rCount++;
            continue;
        }

        if (overwrite) {
            newTuple[count++] = right;
            lCount++;
            rCount++;
            continue;
        }
        return null;
    }

    var andTuples = new Array(count);
    //Array.Copy(newTuple, andTuples, count);
    return T(newTuple);
}

_T.prototype.Permutate = function () {
    var count = 0;
    for (var i = 0; i < this.Permutation.length; ++i) {
        if (this.Permutation[i] >= 0)
            count++;
    }

    var result = new Array(count);
    for (var i = 0; i < this.elements.length; i++) {
        if (this.Permutation[i] >= 0)
            result[i] = this.elements[this.Permutation[i]];
    }
    return result;
};

_T.prototype.ApplyProjection = function (projection) {
    return T(this.ApplyCompressedProjection(projection, new Array(projection.length / 2)));
};

_T.prototype.ApplyCompressedProjection = function (projection, target) {
    for (var i = 0; i < projection.length / 2; i++) {
        target[projection[2 * i + 1]] = this.elements[projection[2 * i]];
    }
    return target;
}


_T.prototype.ApplyCompressedProjection = function (dimension) {    
    return Enumerable.From(x.elements).FirstOrDefault(function(e){return e.Dimension.equals(dimension);});
}