document.addEventListener('HTMLImportsLoaded', function() {
    var qf = document.getElementById('qunit-fixture');

    asyncTest( 'attribute field', function() {

        expect( 1 );

        qf.innerHTML = '<fox-model field="b.c"><fox-json json=\'{"a":1,"b":{"c":[1,2,3]}}\'></fox-json></fox-model>';

        ok(qf.firstChild.data[2] === 3);

        start();

    });

    asyncTest( 'attribute mode default', function() {

        expect( 1 );

        qf.innerHTML = '<fox-model><fox-json json=\'{"a":1,"b":{"c":[1,2,3]}}\'></fox-json></fox-model>';

        qf.firstChild.firstChild.setValue([1,2,3]);

        setTimeout(function(){
            ok(qf.firstChild.data.length === 3);
            start();
        }, 100);

    });

    asyncTest( 'attribute mode append', function() {

        expect( 2 );

        qf.innerHTML = '<fox-model mode="append"><fox-json json=\'[1,2,3]\'></fox-json></fox-model>';

        qf.firstChild.firstChild.setValue([4,5,6]);

        setTimeout(function(){
            ok(qf.firstChild.data.length === 6);
            ok(qf.firstChild.data[0] === 1);
            start();
        }, 100);

    });

    asyncTest( 'attribute mode prepend', function() {

        expect( 2 );

        qf.innerHTML = '<fox-model mode="prepend"><fox-json json=\'[1,2,3]\'></fox-json></fox-model>';

        qf.firstChild.firstChild.setValue([4,5,6]);

        setTimeout(function(){
            ok(qf.firstChild.data.length === 6);
            ok(qf.firstChild.data[0] === 4);
            start();
        }, 100);

    });

    asyncTest( 'dynamic created', function() {

        expect( 1 );

        var foxModel = document.createElement('fox-model');
        var foxJson = document.createElement('fox-json');

        foxModel.appendChild(foxJson);

        qf.appendChild(foxModel);

        foxJson.setValue([4,5,6]);

        setTimeout(function(){
            ok(foxModel.data[0] === 4);
            start();
        }, 100);

    });

    asyncTest( 'sibling nodes', function() {

        expect( 1 );

        var foxModel = document.createElement('fox-model');
        foxModel.sourceselector = '#foxJson'

        var foxJson = document.createElement('fox-json');
        foxJson.id = 'foxJson';

        qf.appendChild(foxModel);
        qf.appendChild(foxJson);

        foxJson.setValue([4,5,6]);

        setTimeout(function(){
            ok(foxModel.data[0] === 4);
            start();
        }, 100);

    });
}, false);
