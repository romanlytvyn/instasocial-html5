/*
 * File: app/controller/NetworksController.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('InstaSocial.controller.NetworksController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.networksController',

    config: {
        refs: {
            networkList: 'networkList',
            btLogin: '#btLogin',
            btLogout: '#btLogout',
            networkPanel: '#networkPanel'
        },

        control: {
            "btLogin": {
                tap: 'onBtLoginTap'
            },
            "btLogout": {
                tap: 'onBtLogoutTap'
            },
            "networkList": {
                itemtap: 'onNetworkListItemTap'
            }
        }
    },

    onBtLoginTap: function() {
        var networksController = InstaSocial.app.getController(config.controllers.networksController);
        var networkPanel = Ext.Viewport.down(config.views.networkPanel);
        var record = networkPanel.getRecord();
        var network = record.data;

        core.connectivity.networks[network.id].login(networksController.setState);

    },

    onBtLogoutTap: function() {
        var networksController = InstaSocial.app.getController(config.controllers.networksController);
        var networkPanel = Ext.Viewport.down(config.views.networkPanel);
        var record = networkPanel.getRecord();
        var network = record.data;

        core.connectivity.networks[network.id].logout(networksController.setState);
    },

    onNetworkListItemTap: function(dataview, index, target, record, e, eOpts) {
        var network = record.data;
        var networkPanel = Ext.Viewport.down(config.views.networkPanel);

        if(!networkPanel){
            networkPanel = Ext.widget(config.views.networkPanel);
        } 

        networkPanel.setRecord(record);
        networkPanel.setData({name:network.name, image:network.image});

        core.ui.display.loading.start();

        var networksController = InstaSocial.app.getController(config.controllers.networksController);
        networksController.setState(null);


        var showPanelArgs = {
            panel: networkPanel,
            target: target
        };

        core.connectivity.networks[network.id].checkState(networksController.showPanel, showPanelArgs);
    },

    setState: function(args) {
        var state;
        if(args !== null){
            state = args.state;
        }else{
            state = null;
        }

        if(state == config.core.connectivity.state.loggedin){
            Ext.getCmp('btLogin').hide();
            Ext.getCmp('btLogout').show();
        }else{
            Ext.getCmp('btLogin').show();
            Ext.getCmp('btLogout').hide();
        }

        InstaSocial.app.getController(config.controllers.networksController).setupNewsFeed();
    },

    showPanel: function(args) {
        var networksController = InstaSocial.app.getController(config.controllers.networksController);
        networksController.setState(args);

        args.panel.showBy(args.target);
        core.ui.display.loading.stop();
    },

    setupNewsFeed: function() {
        var newsFeedCarousel = Ext.getCmp(config.views.newsFeedCarousel);
        var newsFeedToggle = Ext.getCmp('newsFeedToggle');
        var activeNetworksNum = core.connectivity.getActiveNetworks().length;

        newsFeedCarousel.removeAll(false, false);

        if(activeNetworksNum > 0){
            InstaSocial.app.getController(config.controllers.networksController).setupNewsFeedList('an', config.core.connectivity.state.loggedin);
        }else{
            InstaSocial.app.getController(config.controllers.networksController).setupNewsFeedList('an', config.core.connectivity.state.loggedout);
        }

        for(var id in core.connectivity.networks){
            InstaSocial.app.getController(config.controllers.networksController).setupNewsFeedList(id, core.connectivity.networks[id].state);   
        }

        if(newsFeedToggle.items.items.length > 0){
            newsFeedCarousel.setActiveItem(0);
            newsFeedToggle.setPressedButtons([0]);
        }

        if(activeNetworksNum < 1){
            Ext.getCmp(config.views.newsFeedNavigationBar).setTitle(labels.lblNewsFeed);
            Ext.getCmp('btNewsFeedRefresh').hide();
            Ext.getCmp('btNewsFeedPost').hide();
        }else{
            Ext.getCmp('btNewsFeedRefresh').show();
            Ext.getCmp('btNewsFeedPost').show();
        }
    },

    setupNewsFeedList: function(id, state) {
        var newsFeedCarousel = Ext.getCmp(config.views.newsFeedCarousel);
        var newsFeedToggle = Ext.getCmp('newsFeedToggle');
        var newsFeedToggleButton = Ext.getCmp('btNewsFeedToggle' + id);
        var activeNetworksNum = core.connectivity.getActiveNetworks().length;
        var newsFeedToggleBtWidth = 100 / (activeNetworksNum + 1);

        if(state == config.core.connectivity.state.loggedin){
            newsFeedCarousel.add({xtype: 'newsFeed' + id + 'List'});

            newsFeedToggle.remove(newsFeedToggleButton);
            newsFeedToggleButton = {
                xtype: 'button',
                action: 'onBtNewsFeedToggleTap',
                id: 'btNewsFeedToggle' + id,
                style: 'width:' + newsFeedToggleBtWidth + '%;',
                html:'<img src="resources/img/network-' + id + '.png" style="max-height:100%; max-width:100%;"/>'
            };
            newsFeedToggle.add(newsFeedToggleButton);

        }else{
            if(newsFeedToggleButton !== null && newsFeedToggleButton !== undefined){
                newsFeedToggle.remove(newsFeedToggleButton);
            }
        }
    }

});