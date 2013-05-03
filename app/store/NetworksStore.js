/*
 * File: app/store/NetworksStore.js
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

Ext.define('InstaSocial.store.NetworksStore', {
    extend: 'Ext.data.Store',
    alias: 'store.networksStore',

    requires: [
        'InstaSocial.model.NetworkModel'
    ],

    config: {
        data: [
            {
                id: 'fb',
                name: 'Facebook',
                image: 'resources/img/network-fb.png',
                state: 0
            },
            {
                id: 'vk',
                name: 'Vkontakte',
                image: 'resources/img/network-vk.png',
                state: 0
            }
        ],
        model: 'InstaSocial.model.NetworkModel',
        storeId: 'NetworksStore'
    }
});