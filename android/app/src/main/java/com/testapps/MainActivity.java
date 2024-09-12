package com.testapps;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     * JavaScript から登録されたメイン コンポーネントの名前を返します。
     * これは、コンポーネントのレンダリングをスケジュールするために使用されます。
     */
    @Override
    protected String getMainComponentName() {
        return "TestApps";
    }

    /**
     * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
     * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
     * (aka React 18) with two boolean flags.
     * {@link ReactActivityDelegate} のインスタンスを返します。ここでは、2 つのブール フラグを使用して
     * Fabric と Concurrent React (別名 React 18) を簡単に有効にできるユーティリティ クラス {@link
     * DefaultReactActivityDelegate} を使用します。
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(
                this,
                getMainComponentName(),
                // If you opted-in for the New Architecture, we enable the Fabric Renderer.
                DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
