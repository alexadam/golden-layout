var config = {
    settings:{
        hasHeaders: true,
        constrainDragToContainer: false,
        reorderEnabled: true,
        selectionEnabled: true,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: false,
        showMaximiseIcon: false,
        showCloseIcon: true
    },
    content: [{
        type: 'row',
        content: [{
            type:'component',
            componentName: 'example',
            componentState: { text: 'Component 1' }
        },
        {
            type:'component',
            componentName: 'example',
            componentState: { text: 'Component 2' }
        }]
    }]
};

var myLayout = new window.GoldenLayout( config, $('#layoutContainer') );


var resizeFunction = () => {
    var elms = document.getElementsByClassName('lm_content')
    for (var i = 0; i < elms.length; i++) {
        var el = elms.item(i)
        let parentHeight = el.style.height
        let parentWidth = el.style.width
        console.log(parentWidth, parentHeight, el.childNodes.length);

        let svgContainer = el.childNodes[0]

        if (svgContainer) {
            let svgElem = el.childNodes[0].childNodes[1]
            if (svgElem && svgElem.tagName === 'svg') {
                svgContainer.style.width = (parentWidth)
                svgContainer.style.height = (parentHeight)
                svgElem.style.width = (parentWidth)
                svgElem.style.height = (parentHeight)
                // svgElem.style.backgroundColor = 'blue'
            }
        }
    }
}
myLayout.on('componentCreated',function(component) {
    component.container.on('resize', resizeFunction);
});

var registerAllComponents = () => {
    myLayout.registerComponent( 'example', function( container, state ){
        container.getElement().html( '<h2>' + state.text + '</h2>');
        // container.getElement().html( createDraggggg(state.text));
    });
    myLayout.registerComponent( 'svgComponent', function( container, state ){
        // container.getElement().html(
        //     '<li class="menu-item-www">' +
        //     state.text +
        //     createSvgElem1(state.color)
        //     + '</li>'
        // );

        let elemText = '<li class="menu-item-www">' +
                state.text +
                createSvgElem1(state.color)
                + '</li>'
        let elem = $(elemText)

        // elem.on('click', () => {
        //     container.extendState({
        //         color: state.color === 'red' ? 'green' : 'red'
        //     });
        // })
        container.getElement().append( elem );
    });
    myLayout.registerComponent( 'svgComponentSingle', function( container, state ){

        let elemText = '<li class="menu-item-www">' +
                state.text +
                createSvgElem2(state.color)
                + '</li>'
        let elem = $(elemText)

        // let f = () => {
        //     console.log('STATE', state);
        //     container.extendState({
        //         color: state.color === 'red' ? 'green' : 'red'
        //     });
        //     let color = state.color === 'red' ? 'green' : 'red'
        //     let elemText = '<li class="menu-item-www">' +
        //             state.text +
        //             createSvgElem2(color)
        //             + '</li>'
        //     console.log(elemText);
        //     let elem = $(elemText)
        //     elem.on('click', f)
        //     container.getElement().html( elem );
        //     resizeFunction()
        // }
        //
        // elem.on('click', f)

        // container.getElement().html();
        container.getElement().html( elem );
    });
}
registerAllComponents()


myLayout.init();





var addMenuItem = function( title, text ) {
    var element = $( '<li class="menu-item-www">' +
    text +
    createSvgElem1('white')
    + '</li>' );
    $( '#menuContainer' ).append( element );

   var newItemConfig = {
        title: title,
        type: 'component',
        componentName: 'svgComponent',
        componentState: { text: text }
    };

    myLayout.createDragSource( element, newItemConfig );
};
var addMenuItemSingle = function( title, text ) {
    var element = $( '<li class="menu-item-www">' +
    text +
    createSvgElem2('white')
    + '</li>' );
    $( '#menuContainer' ).append( element );

   var newItemConfig = {
        title: title,
        type: 'component',
        componentName: 'svgComponentSingle',
        componentState: { text: text, color: 'blue' }
    };

    myLayout.createDragSource( element, newItemConfig );
};

var createSvgElem1 = (bgColor) => {
    return `
    <svg style="background-color:${bgColor}" viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect width="100" height="100" />
        <rect x="120" width="100" height="100" rx="15" />
    </svg>
    `
}
var createSvgElem2 = (bgColor) => {
    return `
    <svg style="background-color:${bgColor}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <rect x="0" width="100" height="100" rx="15" />
    </svg>
    `
}



var createDraggggg = function(text) {
   //  var element = $( '<h2>' + text + '</h2>' );
   //
   // var newItemConfig = {
   //      title: text,
   //      type: 'component',
   //      componentName: 'example',
   //      componentState: { text: text }
   //  };
   //
   //  myLayout.createDragSource( element, newItemConfig );
   //  return element


   // var slides = document.getElementsByClassName("aaa-drag");
   // console.log('p[p[p[p[[]]]]]', slides);
   //  for(var i = 0; i < slides.length; i++)
   //  {
   //       text = 'a' + i
   //       console.log(text);
   //
   //      var newItemConfig = {
   //           title: text,
   //           type: 'component',
   //           componentName: 'example',
   //           componentState: { text: text }
   //       };
   //
   //       myLayout.createDragSource( slides.item(i), newItemConfig );
   //  }

}
// setTimeout(createDraggggg, 2000)
// createDraggggg()

// myLayout.on( 'componentCreated', function( component ){
//     myLayout.createDragSource( component, component.config );
// });

addMenuItem( 'Add me!', 'You\'ve added me!' );
addMenuItemSingle( 'Me too!', 'You\'ve added me too!' );


// myLayout.on('tabCreated', function () {
//     console.log('on drag');
// })

var btn = document.getElementById('get-data-btn')
btn.addEventListener('click', ()=> {
    console.log('get data', myLayout.toConfig());
})

var btn = document.getElementById('orientation-btn')
btn.addEventListener('click', ()=> {
    let tmpEl = document.getElementById('layoutContainer')
    if (layoutContainer.style.width === '1000px') {
        layoutContainer.style.width = '600px'
        layoutContainer.style.height = '1000px'
        myLayout.updateSize(600, 1000)
    } else {
        layoutContainer.style.width = '1000px'
        layoutContainer.style.height = '600px'
        myLayout.updateSize(1000, 600)
    }
})





// TODO dynamically change component HOOK
var onCustomSelectionF = (e) => {
    console.log('layout on resize', e, "][][][][][][][]" , e.config.componentState.color);
    e.container.extendState({
        color: e.config.componentState.color === 'yellow' ? 'orange' : 'yellow'
    });


    // let newElem = null
    // if (e.config.componentName === 'svgComponentSingle') {
    //     newElem = createSvgElem1('yellow')
    //     e.config.componentName = 'svgComponent'
    // } else {
    //     newElem = createSvgElem2('orange')
    //     e.config.componentName = 'svgComponentSingle'
    // }
    // //
    // // e.config.componentState
    // //
    // let ch = e.element.children()
    // // let svg = $(ch[0]).find('svg')
    // e.element.html(newElem)
    // // console.log('CHILDREN', svg.parent());
    // resizeFunction()


    let state = JSON.stringify( myLayout.toConfig() );
    console.log(state);

    myLayout.destroy()
    myLayout = new window.GoldenLayout( JSON.parse( state ), $('#layoutContainer') );


    //// ordrr matters !!!!! \/\/\/\/


    registerAllComponents()

    myLayout.on('custom-selection', onCustomSelectionF)
    myLayout.on('componentCreated',function(component) {
        component.container.on('resize', resizeFunction);
    });

    myLayout.init()

    resizeFunction()
}
myLayout.on('custom-selection', onCustomSelectionF)



myLayout.on('stateChanged', (e) => {
    console.log('state stateChanged', e);
    // var state = JSON.stringify( myLayout.toConfig() );
    // myLayout = new GoldenLayout( JSON.parse( state ) );
    // myLayout.init()
})
