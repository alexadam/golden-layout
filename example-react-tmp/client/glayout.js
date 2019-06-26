

import React from 'react'
import ReactDOM from 'react-dom';

import {$,jQuery} from 'jquery'
// export for others scripts to use
window.$ = $
window.jQuery = jQuery
window.React = React;
window.ReactDOM = ReactDOM;
//
// // import GoldenLayoutLib from './lib/goldenlayout.min'
// import './lib/base.scss'
// import './lib/dark-theme.scss'

// import  GoldenLayout from 'golden-layout';
import  GoldenLayout from './lib/src/js_es6/LayoutManager';
// import  GoldenLayout from './lib/src/js/LayoutManager';
// import * as GoldenLayout from '../../dist/js/goldenlayout';
// import * as GoldenLayout from '../../index.d.ts';
// import * as GoldenLayout from 'GoldenLayout';
// import '../../dist/css/goldenlayout.css';
import './lib/src/css/goldenlayout-base.css';
import './lib/src/css/goldenlayout-dark-theme.css';


var config = {
  content: [{
    type: 'row',
    content: [
       {
        title: 'A react component',
        type:'react-component',
        component: 'testItem',
        props: {value: 'I\'m on the left'}
       },
        {
        title: 'Another react component',
        type:'react-component',
        component: 'testItem'
       }
    ]
  }]
};


class Gigi extends React.Component {
    state = {
        value: parseInt(this.props.glContainer._config.props.value)
    }

    componentDidMount = () => {
        // this.props.glEventHub.on('bibi', () => {
        //     console.log('YUYUYUYUYUYUY');
        // })
        this.props.glContainer.on('resize', () => {
            console.log('YUYUYUYUYUYUY 222');
        })
    }

    componentWillUnmount() {
     //    glEventHub.off('YourComponentProps', this.setState, this)
     //    this.props.glContainer.off('resize', () => {
     //        console.log('YUYUYUYUYUYUY 222');
     //    })
     }

    onClick = () => {
        // console.log(this.props.glContainer);
        // console.log(this.props.glEventHub);
        this.props.glContainer._config.props['value'] = this.state.value+1
        this.props.glContainer.extendState({
                value: this.state.value+1
        });
        this.setState({value: this.state.value+1})
    }

    render = () => {

        let svgElem = null
        if (this.props.glContainer._config.props['type'] === 'svgElem1') {
            svgElem = <SVGElem1 bgColor="red" />
        } else if (this.props.glContainer._config.props['type'] === 'svgElem2') {
            svgElem = <SVGElem2 bgColor="yellow" />
        }

        return (
            <div style={{color:'white', width: '100%', height: '100%'}}>
                GIGI {this.state.value} -- {this.props.value}
                <button onClick={this.onClick}>incr</button>
                {svgElem}
            </div>
        )
    }
}

class SVGElem1 extends React.Component {
    render = () => {
        return (
            <div className="svgWrapper" style={{width:'100%', height:'100%'}}>
                <svg style={{backgroundColor:this.props.bgColor, width:'100%', height:'100%'}} viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <rect width="100" height="100" />
                    <rect x="120" width="100" height="100" rx="15" />
                </svg>
            </div>
        )
    }
}
class SVGElem2 extends React.Component {
    render = () => {
        return (
            <div className="svgWrapper" style={{width:'100%', height:'100%'}}>
                <svg style={{backgroundColor:this.props.bgColor, width:'100%', height:'100%'}} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    <rect x="0" width="100" height="100" rx="15" />
                </svg>
            </div>
        )
    }
}

class MenuItem1 extends React.Component {

    state = {
        bgColor: 'blue'
    }

    render = () => {
        return (
            <div id="MenuItem1" style={{width:'200px', height:'100px', backgroundColor:'yellow'}}>
                <SVGElem1 bgColor={this.state.bgColor} />
            </div>
        )
    }
}

class MenuItem2 extends React.Component {
    state = {
        bgColor: 'red'
    }

    render = () => {
        return (
            <div id="MenuItem2" style={{width:'200px', height:'100px', backgroundColor:'yellow'}}>
                <SVGElem2 bgColor={this.state.bgColor} />
            </div>
        )
    }
}

export default class MyGoldenLayout extends React.PureComponent {

  componentDidMount() {
        // Build basic golden-layout config
        const config = {
            content: [{
                type: 'row',
                content: [{
                    type: 'react-component',
                    component: 'TestComponentContainer',
                    props: {value: 11, type: 'svgElem1'}
                },{
                    type: 'react-component',
                    component: 'IncrementButtonContainer',
                    props: {value: 22, type: 'svgElem2'}
                },{
                    type: 'react-component',
                    component: 'DecrementButtonContainer',
                    props: {value: 33, type: 'svgElem1'}
                }]
            }]
        };

        function wrapComponent(Component, store) {
            class Wrapped extends React.Component {
                render() {
                    // return (
                    //     <Provider store={store}>
                    //         <Component {...this.props}/>
                    //     </Provider>
                    // );
                    return (
                        <Gigi {...this.props}/>
                    );
                }
            }
            return Wrapped;
        };

        var layout = new GoldenLayout(config, this.layout);
        layout.registerComponent('IncrementButtonContainer',
                                // (a, b) => {
                                //     console.log('[][][]', a, b);
                                 wrapComponent('IncrementButtonContainer', 'this.context.store')
                                // }


        );
        layout.registerComponent('DecrementButtonContainer',
                                 wrapComponent('DecrementButtonContainer', 'this.context.store')
                                // () => <Gigi />
        );
        layout.registerComponent('TestComponentContainer',
                                 wrapComponent('TestComponentContainer', 'this.context.store')
        );

        layout.init();




        // let element = window.jQuery( '<div class="menu-item-www">' +
        //     'createSvgElem1(whitew)'
        //     + '</div>' );
        // $( '#menuContainer' ).append( element );
        let newItemConfig = {
            title: 'title',
            type: 'react-component',
            component: 'IncrementButtonContainer',
            props: { value: 88, type: 'svgElem1'}
        };

        layout.createDragSource(document.getElementById('MenuItem1'), newItemConfig );
        let newItemConfig2 = {
            title: 'title',
            type: 'react-component',
            component: 'IncrementButtonContainer',
            props: { value: 88, type: 'svgElem2'}
        };
        layout.createDragSource(document.getElementById('MenuItem2'), newItemConfig2 );





        layout.on('stateChanged', (e) => {
            // console.log('state stateChanged', e);
            // var state = JSON.stringify( myLayout.toConfig() );
            // myLayout = new GoldenLayout( JSON.parse( state ) );
            // myLayout.init()
        })

        layout.on('componentCreated', (component) => {
            component.container.on('resize', () => {
                // component.emit('bibi')
                // component.trigger('bibi')
                // component.container.emit('bibi')
                // component.instance._container.emit('bibi')
                // layout.emit('bibi')
                // console.log(component);
                // console.log('in comp resize !!!', component);
                // component.config.props['value'] = component.config.props['value']+100
            });
        });


        window.addEventListener('resize', () => {
            layout.updateSize();
        });
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}} >
                <div id="menuContainer" style={{display:'flex', flexDirection:'row', width:'1000px', height:'100px'}}>
                    <MenuItem1 />
                    <MenuItem2 />
                </div>
                <div className='goldenLayout' ref={input => this.layout = input} style={{width: '1000px', height: '600px'}}/>
            </div>
        );
    }
}
