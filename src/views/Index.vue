<template>
  <div id="main_wrap">
    <!--LOGO-->
    <div id="Logo" @click="clickLogo">
      <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span><span
        style="color: #3ee343">l</span><span style="color: #ede257">u</span><span style="color: #ef846b">s</span>
    </div>
    <!--顶部内容 根据loginArg判断显示的内容-->
    <div>
      <el-divider content-position="right">
        <el-button v-if="userName!=null" style="cursor: default;" type="text">欢迎您 : {{ this.userName }}</el-button>
        <el-divider direction="vertical" v-if="userName!=null"></el-divider>
        <!--登录/登出-->
        <el-button v-if="userName!=null" @click="logout" type="text" icon="el-icon-s-custom">退出登录</el-button>
        <el-button v-else @click="login" type="text" icon="el-icon-s-custom">登录</el-button>
        <el-divider direction="vertical"></el-divider>
        <!--帮助-->
        <el-popover
            placement="bottom"
            width="160"
            style="margin-top: 2px;margin-bottom: 2px"
            trigger="click"
            v-model="visible">
          <p>去 Github 下载项目？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">不用了</el-button>
            <el-button type="primary" size="mini" @click="openGithub">出发 !</el-button>
          </div>
          <el-button slot="reference" type="text" icon="el-icon-question">帮助</el-button>
        </el-popover>
        <el-divider direction="vertical"></el-divider>
        <!--关于-->
        <el-popover
            placement="bottom"
            title=""
            width="180"
            trigger="click">
          <div>
            <span style="font-family: Monotype Corsiva,serif;font-weight: bolder;font-size: 23px">
              <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span>
              <span style="color: #3ee343">l</span><span style="color: #ede257">u</span><span
                style="color: #ef846b">s</span>
            </span><br/>
            <span style="float: right">coding by 邓童淼</span><br/><span style="float: right">浙江工业大学</span>
          </div>
          <el-button slot="reference" type="text" icon="el-icon-info">关于</el-button>
        </el-popover>
      </el-divider>
    </div>
    <!--分类菜单栏-->
    <div id="NavigationBarContainer">
      <el-menu router class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect">
        <el-menu-item index="0" style="pointer-events: none;"><i class="el-icon-s-grid"></i>图书分类</el-menu-item>
        <el-submenu index="1">
          <template slot="title">教育</template>
          <el-submenu index="1-1">
            <template slot="title">教材</template>
            <el-menu-item index="1-1-1" @click="jump('1-1-1')">研究生/本科生/专科生教材</el-menu-item>
            <el-menu-item index="1-1-2" @click="jump('1-1-2')">高职高专教材</el-menu-item>
            <el-menu-item index="1-1-3" @click="jump('1-1-3')">中职教材</el-menu-item>
            <el-menu-item index="1-1-4" @click="jump('1-1-4')">成人教育教材</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template slot="title">外语</template>
            <el-menu-item index="1-2-1" @click="jump('1-2-1')">英语</el-menu-item>
            <el-menu-item index="1-2-2" @click="jump('1-2-2')">CTE-6/CTE-4</el-menu-item>
            <el-menu-item index="1-2-3" @click="jump('1-2-3')">日语</el-menu-item>
            <el-menu-item index="1-2-4" @click="jump('1-2-4')">韩语</el-menu-item>
            <el-menu-item index="1-2-5" @click="jump('1-2-5')">小语种</el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">考试</template>
            <el-menu-item index="1-3-1" @click="jump('1-3-1')">学历考试</el-menu-item>
            <el-menu-item index="1-3-2" @click="jump('1-3-2')">公务员</el-menu-item>
            <el-menu-item index="1-3-3" @click="jump('1-3-3')">考研</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <template slot="title">工具书</template>
            <el-menu-item index="1-4-1" @click="jump('1-4-1')">汉语工具书</el-menu-item>
            <el-menu-item index="1-4-2" @click="jump('1-4-2')">英语工具书</el-menu-item>
            <el-menu-item index="1-4-3" @click="jump('1-4-3')">其他语种工具书</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">小说</template>
          <el-menu-item index="2-1" @click="jump('2-1')">科幻小说</el-menu-item>
          <el-menu-item index="2-2" @click="jump('2-2')">武侠小说</el-menu-item>
          <el-menu-item index="2-3" @click="jump('2-3')">军事小说</el-menu-item>
          <el-menu-item index="2-4" @click="jump('2-4')">情感小说</el-menu-item>
          <el-menu-item index="2-5" @click="jump('2-5')">侦探/悬疑/推理小说</el-menu-item>
          <el-menu-item index="2-6" @click="jump('2-6')">历史小说</el-menu-item>
          <el-menu-item index="2-7" @click="jump('2-7')">社会小说</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">文艺</template>
          <el-submenu index="3-1">
            <template slot="title">文学</template>
            <el-menu-item index="3-1-1" @click="jump('3-1-1')">中国古诗词</el-menu-item>
            <el-menu-item index="3-1-2" @click="jump('3-1-2')">民间文学</el-menu-item>
            <el-menu-item index="3-1-3" @click="jump('3-1-3')">中国现当代随笔</el-menu-item>
            <el-menu-item index="3-1-4" @click="jump('3-1-4')">外国随笔</el-menu-item>
            <el-menu-item index="3-1-5" @click="jump('3-1-5')">名家作品</el-menu-item>
          </el-submenu>
          <el-submenu index="3-2">
            <template slot="title">传记</template>
            <el-menu-item index="3-2-1" @click="jump('3-2-1')">财经人物</el-menu-item>
            <el-menu-item index="3-2-2" @click="jump('3-2-2')">历代帝王</el-menu-item>
            <el-menu-item index="3-2-3" @click="jump('3-2-3')">军事人物</el-menu-item>
            <el-menu-item index="3-2-4" @click="jump('3-2-4')">历史人物</el-menu-item>
            <el-menu-item index="3-2-4" @click="jump('3-2-4')">教育家</el-menu-item>
          </el-submenu>
          <el-submenu index="3-3">
            <template slot="title">艺术</template>
            <el-menu-item index="3-3-1" @click="jump('3-3-1')">艺术理论</el-menu-item>
            <el-menu-item index="3-3-2" @click="jump('3-3-2')">书法/篆刻</el-menu-item>
            <el-menu-item index="3-3-3" @click="jump('3-3-3')">音乐</el-menu-item>
            <el-menu-item index="3-3-4" @click="jump('3-3-4')">雕塑</el-menu-item>
            <el-menu-item index="3-3-5" @click="jump('3-3-5')">绘画</el-menu-item>
            <el-menu-item index="3-3-6" @click="jump('3-3-6')">小人书/连环画</el-menu-item>
          </el-submenu>
          <el-submenu index="3-4">
            <template slot="title">摄影</template>
            <el-menu-item index="3-4-1" @click="jump('3-4-1')">摄影理论</el-menu-item>
            <el-menu-item index="3-4-2" @click="jump('3-4-2')">摄影入门</el-menu-item>
            <el-menu-item index="3-4-3" @click="jump('3-4-3')">摄影进阶</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">人文社科</template>
          <el-submenu index="4-1">
            <template slot="title">历史</template>
            <el-menu-item index="4-1-1" @click="jump('4-1-1')">中国史</el-menu-item>
            <el-menu-item index="4-1-2" @click="jump('4-1-2')">世界史</el-menu-item>
            <el-menu-item index="4-1-3" @click="jump('4-1-3')">历史地理</el-menu-item>
            <el-menu-item index="4-1-4" @click="jump('4-1-4')">民族史</el-menu-item>
          </el-submenu>
          <el-submenu index="4-2">
            <template slot="title">文化</template>
            <el-menu-item index="4-2-1" @click="jump('4-2-1')">传统文化</el-menu-item>
            <el-menu-item index="4-2-2" @click="jump('4-2-2')">各国文化</el-menu-item>
          </el-submenu>
          <el-submenu index="4-3">
            <template slot="title">古籍</template>
            <el-menu-item index="4-3-1" @click="jump('4-3-1')">史类</el-menu-item>
            <el-menu-item index="4-3-2" @click="jump('4-3-2')">经部</el-menu-item>
            <el-menu-item index="4-3-3" @click="jump('4-3-3')">子部</el-menu-item>
            <el-menu-item index="4-3-4" @click="jump('4-3-4')">集部</el-menu-item>
          </el-submenu>
          <el-submenu index="4-4">
            <template slot="title">心理学</template>
            <el-menu-item index="4-4-1" @click="jump('4-4-1')">心理百科</el-menu-item>
            <el-menu-item index="4-4-2" @click="jump('4-4-2')">心理学著作</el-menu-item>
            <el-menu-item index="4-4-3" @click="jump('4-4-3')">社会心理学</el-menu-item>
          </el-submenu>
          <el-submenu index="4-5">
            <template slot="title">社会科学</template>
            <el-menu-item index="4-5-1" @click="jump('4-5-1')">社会科学总论</el-menu-item>
            <el-menu-item index="4-5-2" @click="jump('4-5-2')">社会学</el-menu-item>
            <el-menu-item index="4-5-3" @click="jump('4-5-3')">文化人类学</el-menu-item>
          </el-submenu>
          <el-submenu index="4-6">
            <template slot="title">法律</template>
            <el-menu-item index="4-6-1" @click="jump('4-6-1')">民法</el-menu-item>
            <el-menu-item index="4-6-2" @click="jump('4-6-2')">经济法</el-menu-item>
            <el-menu-item index="4-6-3" @click="jump('4-6-3')">刑法</el-menu-item>
            <el-menu-item index="4-6-4" @click="jump('4-6-4')">理论法学</el-menu-item>
            <el-menu-item index="4-6-5" @click="jump('4-6-5')">法律法规</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">童书</template>
          <el-menu-item index="5-1" @click="jump('5-1')">科普/百科</el-menu-item>
          <el-menu-item index="5-2" @click="jump('5-2')">绘本</el-menu-item>
          <el-menu-item index="5-3" @click="jump('5-3')">文学</el-menu-item>
          <el-menu-item index="5-4" @click="jump('5-4')">少儿英语</el-menu-item>
          <el-menu-item index="5-5" @click="jump('5-5')">幼儿启蒙</el-menu-item>
          <el-menu-item index="5-6" @click="jump('5-6')">动漫卡通</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">经管</template>
          <el-submenu index="6-1">
            <template slot="title">管理</template>
            <el-menu-item index="6-1-1" @click="jump('6-1-1')">一般管理学</el-menu-item>
            <el-menu-item index="6-1-2" @click="jump('6-1-2')">会计</el-menu-item>
            <el-menu-item index="6-1-3" @click="jump('6-1-3')">市场/营销</el-menu-item>
            <el-menu-item index="6-1-4" @click="jump('6-1-4')">管理信息系统</el-menu-item>
            <el-menu-item index="6-1-5" @click="jump('6-1-5')">金融/投资</el-menu-item>
            <el-menu-item index="6-1-6" @click="jump('6-1-6')">MBA</el-menu-item>
            <el-menu-item index="6-1-7" @click="jump('6-1-7')">电子商务</el-menu-item>
          </el-submenu>
          <el-submenu index="6-2">
            <template slot="title">投资/理财</template>
            <el-menu-item index="6-2-1" @click="jump('6-2-1')">证券/股票</el-menu-item>
            <el-menu-item index="6-2-2" @click="jump('6-2-2')">基金</el-menu-item>
            <el-menu-item index="6-2-3" @click="jump('6-2-3')">期货</el-menu-item>
            <el-menu-item index="6-2-4" @click="jump('6-2-4')">外汇</el-menu-item>
            <el-menu-item index="6-2-5" @click="jump('6-2-5')">保险</el-menu-item>
            <el-menu-item index="6-2-6" @click="jump('6-2-6')">纳税</el-menu-item>
          </el-submenu>
          <el-submenu index="6-3">
            <template slot="title">经济</template>
            <el-menu-item index="6-3-1" @click="jump('6-3-1')">经济学理论</el-menu-item>
            <el-menu-item index="6-3-2" @click="jump('6-3-2')">区域经济</el-menu-item>
            <el-menu-item index="6-3-3" @click="jump('6-3-3')">通货膨胀</el-menu-item>
            <el-menu-item index="6-3-4" @click="jump('6-3-4')">经济法</el-menu-item>
            <el-menu-item index="6-3-5" @click="jump('6-3-5')">统计/审计</el-menu-item>
            <el-menu-item index="6-3-6" @click="jump('6-3-6')">经济史</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">期刊</template>
          <el-menu-item index="7-1-1" @click="jump('7-1-1')">娱乐时尚</el-menu-item>
          <el-menu-item index="7-1-2" @click="jump('7-1-2')">旅游/人文</el-menu-item>
          <el-menu-item index="7-1-3" @click="jump('7-1-3')">家庭/美食</el-menu-item>
          <el-menu-item index="7-1-4" @click="jump('7-1-4')">汽车</el-menu-item>
          <el-menu-item index="7-1-5" @click="jump('7-1-5')">IT/科技</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">科技</template>
          <el-submenu index="8-1">
            <template slot="title">科普读物</template>
            <el-menu-item index="8-1-1" @click="jump('8-1-1')">宇宙知识</el-menu-item>
            <el-menu-item index="8-1-2" @click="jump('8-1-2')">人类故事</el-menu-item>
            <el-menu-item index="8-1-3" @click="jump('8-1-3')">生物世界</el-menu-item>
            <el-menu-item index="8-1-4" @click="jump('8-1-4')">科学世界</el-menu-item>
            <el-menu-item index="8-1-5" @click="jump('8-1-5')">百科知识</el-menu-item>
          </el-submenu>
          <el-submenu index="8-2">
            <template slot="title">建筑</template>
            <el-menu-item index="8-2-1" @click="jump('8-2-1')">建筑科学</el-menu-item>
            <el-menu-item index="8-2-2" @click="jump('8-2-2')">建筑史与建筑文化</el-menu-item>
            <el-menu-item index="8-2-3" @click="jump('8-2-3')">室内设计/装潢装修</el-menu-item>
            <el-menu-item index="8-2-4" @click="jump('8-2-4')">园林景观/环境艺术</el-menu-item>
            <el-menu-item index="8-2-5" @click="jump('8-2-5')">建筑外观设计</el-menu-item>
          </el-submenu>
          <el-submenu index="8-3">
            <template slot="title">医学</template>
            <el-menu-item index="8-3-1" @click="jump('8-3-1')">预防医学/卫生学</el-menu-item>
            <el-menu-item index="8-3-2" @click="jump('8-3-2')">临床医学理论</el-menu-item>
            <el-menu-item index="8-3-3" @click="jump('8-3-3')">内科学</el-menu-item>
            <el-menu-item index="8-3-4" @click="jump('8-3-4')">外科学</el-menu-item>
            <el-menu-item index="8-3-5" @click="jump('8-3-5')">妇产科学</el-menu-item>
            <el-menu-item index="8-3-6" @click="jump('8-3-6')">儿科学</el-menu-item>
            <el-menu-item index="8-3-7" @click="jump('8-3-7')">护理学</el-menu-item>
            <el-menu-item index="8-3-8" @click="jump('8-3-8')">中医</el-menu-item>
            <el-menu-item index="8-3-9" @click="jump('8-3-9')">药学</el-menu-item>
          </el-submenu>
          <el-submenu index="8-4">
            <template slot="title">计算机/网络</template>
            <el-menu-item index="8-4-1" @click="jump('8-4-1')">计算机理论</el-menu-item>
            <el-menu-item index="8-4-2" @click="jump('8-4-2')">操作系统</el-menu-item>
            <el-menu-item index="8-4-3" @click="jump('8-4-3')">数据库</el-menu-item>
            <el-menu-item index="8-4-4" @click="jump('8-4-4')">程序设计</el-menu-item>
            <el-menu-item index="8-4-5" @click="jump('8-4-5')">网络与通信技术</el-menu-item>
            <el-menu-item index="8-4-6" @click="jump('8-4-6')">人工智能</el-menu-item>
            <el-menu-item index="8-4-7" @click="jump('8-4-7')">信息安全</el-menu-item>
          </el-submenu>
          <el-submenu index="8-5">
            <template slot="title">自然科学</template>
            <el-menu-item index="8-5-1" @click="jump('8-5-1')">数学</el-menu-item>
            <el-menu-item index="8-5-2" @click="jump('8-5-2')">力学</el-menu-item>
            <el-menu-item index="8-5-3" @click="jump('8-5-3')">物理学</el-menu-item>
            <el-menu-item index="8-5-4" @click="jump('8-5-4')">化学</el-menu-item>
            <el-menu-item index="8-5-5" @click="jump('8-5-5')">天文学</el-menu-item>
            <el-menu-item index="8-5-6" @click="jump('8-5-6')">地球科学</el-menu-item>
            <el-menu-item index="8-5-7" @click="jump('8-5-7')">生物科学</el-menu-item>
          </el-submenu>
          <el-submenu index="8-6">
            <template slot="title">工业技术</template>
            <el-menu-item index="8-6-1" @click="jump('8-6-1')">一般工业技术</el-menu-item>
            <el-menu-item index="8-6-2" @click="jump('8-6-2')">机械/仪表工业</el-menu-item>
            <el-menu-item index="8-6-3" @click="jump('8-6-3')">电工技术</el-menu-item>
            <el-menu-item index="8-6-4" @click="jump('8-6-4')">冶金工业</el-menu-item>
            <el-menu-item index="8-6-5" @click="jump('8-6-5')">能源与动力工程</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="9">
          <template slot="title">成功/励志</template>
          <el-menu-item index="9-1" @click="jump('9-1')">人生哲学</el-menu-item>
          <el-menu-item index="9-2" @click="jump('9-2')">成功/激励</el-menu-item>
          <el-menu-item index="9-3" @click="jump('9-3')">心理与修养</el-menu-item>
          <el-menu-item index="9-4" @click="jump('9-4')">性格与习惯</el-menu-item>
          <el-menu-item index="9-5" @click="jump('9-5')">人际交往</el-menu-item>
          <el-menu-item index="9-6" @click="jump('9-6')">礼仪</el-menu-item>
        </el-submenu>
        <!--搜索-->
        <div>
          <el-button id="SearchBtn" icon="el-icon-search" type="primary" @click="dialogFormVisible = true">搜索
          </el-button>
          <el-dialog title="搜索" :visible.sync="dialogFormVisible" width="35%" center>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="480px"
                     class="demo-ruleForm">
              <el-form-item label="关键字" prop="keyWord">
                <el-input v-model="ruleForm.keyWord" clearable placeholder="请输入内容" style="width: 480px"
                          prefix-icon="el-icon-search" maxlength="10" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="查询范围" prop="scope">
                <el-select v-model="ruleForm.scope" multiple placeholder="请选择" clearable style="width: 480px">
                  <el-option
                      v-for="item in ruleForm.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分类 (可选)">
                <el-cascader
                    style="width: 480px"
                    v-model="ruleForm.classification"
                    placeholder="试试搜索：小说"
                    :options="options"
                    :props="{ multiple: true,checkStrictly: true }"
                    filterable
                    :show-all-levels="false"
                    clearable></el-cascader>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="Search('ruleForm')">搜 索</el-button>
              <el-button @click="CancelSearch('ruleForm')">取 消</el-button>
            </div>
          </el-dialog>
        </div>
      </el-menu>
    </div>
    <!--左侧按钮 根据loginArg判断显示内容-->
    <div>
      <div v-if="userName!=null" class="LeftBtn">
        <!--个人信息-->
        <el-button id="ShowInfoBtn" size="medium" icon="el-icon-user" @click="showUserInfo" type="primary">
          个人信息
        </el-button>
        <el-drawer
            title="DengDeng-plus"
            :visible.sync="drawer_info"
            :direction="direction">
          <el-divider content-position="left"><i class="el-icon-user-solid"></i> 个人信息</el-divider>
          <div id="UserInfo">
            <el-image
                style="width: 150px;height: 150px;margin-top: 30px;margin-left: 100px;margin-bottom: 30px;"
                :src="require('../assets/img/icon/user.png')"
                fit="fill">
            </el-image>
            <el-descriptions class="margin-top" :column="1" size="" border>
              <template slot="extra"></template>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-postcard"></i> 账号</template>
                {{ userInfo.userId }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-user"></i> 用户名</template>
                {{ userInfo.userName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-mobile-phone"></i> 手机号</template>
                {{ userInfo.phoneNumber }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-message"></i> 邮箱</template>
                {{ userInfo.email }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label"><i class="el-icon-office-building"></i> 收货地址</template>
                {{ userInfo.shippingAddress }}
              </el-descriptions-item>
            </el-descriptions>
            <el-button id="EditUserInfoBtn" @click="editUserInfoFunction" icon="el-icon-edit-outline" type="primary"
                       round>
              修改
            </el-button>
          </div>
        </el-drawer>
        <el-dialog :before-close="handleClose" title="修改个人信息" width="30%" :visible.sync="editUserInfo" center>
          <el-form :model="userInfo" :rules="editUserInfoRules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="账号">
              <el-input v-model="userInfo.userId" readonly clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="userInfo.userName" clearable minlength="2" maxlength="5" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="userInfo.phoneNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
              <el-input v-model="userInfo.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="shippingAddress">
              <el-input v-model="userInfo.shippingAddress" clearable></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitEdit('ruleForm')">修改</el-button>
            <el-button @click="resetEdit('ruleForm')">重置</el-button>
          </span>
        </el-dialog>

        <!--我的购物车-->
        <el-button id="ShowCartBtn" size="medium" icon="el-icon-shopping-cart-1" @click="showCartInfo()"
                   type="primary" style="margin-left: 16px;">
          我的购物车
        </el-button>
        <!--由于游客也能访问购物车，因此将购物车的dialog提到if-else外面-->
        <el-dialog :before-close="cancelCheck" title="结算" :visible.sync="checkTable"
                   style="overflow-y: hidden;margin-top: -90px">
          <el-table :data="multipleSelection" height="400">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img :src="scope.row.img" alt="" style="width: 150px;height: 170px">
                  <img slot="reference" :src="scope.row.img" style="width: 50px;height: 55px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column property="bookName" label="书名"></el-table-column>
            <el-table-column property="quantity" label="数量"></el-table-column>
            <el-table-column property="discountPrice" label="单价(元)"></el-table-column>
          </el-table>
          <el-descriptions v-loading="loading" size="small" title="订单信息"
                           style="margin-top: 30px;margin-left: 40px;margin-bottom: 10px">
            <el-descriptions-item label="收货人"><span style="color: #409EFF">{{ userInfo.userName }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="手机号"><span style="color: #409EFF">{{ userInfo.phoneNumber }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="总金额"><span style="color: #409EFF">{{ total }}</span></el-descriptions-item>
            <el-descriptions-item label="收货地址"><span style="color: #409EFF">{{ userInfo.shippingAddress }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="支付方式">
              <el-radio-group v-model="payWay" size="mini">
                <el-radio-button label="支付宝"></el-radio-button>
                <el-radio-button label="微信"></el-radio-button>
                <el-radio-button label="信用卡"></el-radio-button>
                <el-radio-button label="货到付款"></el-radio-button>
              </el-radio-group>
            </el-descriptions-item>
          </el-descriptions>
          <el-button :loading="loadingBtn" @click="check(2)" style="margin-left: 600px" type="primary" round>去付款
          </el-button>
        </el-dialog>

        <!--我的订单-->
        <el-button id="ShowOrderBtn" size="medium" icon="el-icon-document" @click="showDealInfo" type="primary"
                   style="margin-left: 16px;">
          我的订单
        </el-button>
        <el-drawer
            title="DengDeng-plus"
            :visible.sync="drawer_deal"
            :direction="direction"
            style="width: 180%">
          <el-divider content-position="left"><i class="el-icon-tickets"></i> 我的订单</el-divider>
          <el-table
              :data="dealData"
              stripe
              height="550px"
              empty-text="这里什么都没有..."
              v-loading="loading"
              style="width: 100%;margin-top: 40px;">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <div id="eachOrderInfo" v-for="(dealDetail,index) in props.row.dealDetails">
                    <el-form-item label="" style="line-height: 20px">
                      <div id="description" style="width: 650px;margin-left: 20px">
                        <div style="float: left">
                          <el-popover placement="right" title="" trigger="hover">
                            <img :src="dealDetail.bookImg" alt="" style="width: 150px;height: 170px">
                            <img slot="reference" :src="dealDetail.bookImg"
                                 style="width: 55px;height: 60px;margin-left: 15px">
                          </el-popover>
                        </div>
                        <div
                            style="float: left;margin-left: 30px;width: 150px;text-overflow: ellipsis;overflow: hidden;white-space:nowrap">
                          书名 : {{ dealDetail.bookName }}
                        </div>
                        <div style="float: left;margin-left: 20px;width: 100px;">数量 : {{ dealDetail.bookQuantity }}
                          (本)
                        </div>
                        <div style="float: left;margin-left: 20px;width: 120px;">单价 : {{ dealDetail.bookPrice }} (元)
                        </div>
                        <el-button @click="bookDetail_deal(dealDetail.bookId)" style="margin-left: 20px" type="text"
                                   icon="el-icon-info">查看详情
                        </el-button>
                      </div>
                    </el-form-item>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
                type="index"
                fixed="left"
                width="40">
            </el-table-column>
            <!--交易状态： 1-交易完成 2-尚未发货 3-已发货 4-已签收 5-已评论 6-待支付-->
            <el-table-column
                label="状态"
                width="120"
                :filters="[{ text: '交易完成', value: 1 },
              { text: '尚未发货', value: 2 },
              { text: '已发货', value: 3 },
              { text: '已签收', value: 4 },
              { text: '已评论', value: 5 },
              { text: '待支付', value: 6 }]"
                :filter-method="filterState"
                prop="deal.state">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.deal.state === 1" type="success">交易完成</el-tag>
                <el-tag v-else-if="scope.row.deal.state === 2" type="info">尚未发货</el-tag>
                <el-tag v-else-if="scope.row.deal.state === 3" type="primary">已发货</el-tag>
                <el-tag v-else-if="scope.row.deal.state === 4" type="primary">已签收</el-tag>
                <el-tag v-else-if="scope.row.deal.state === 5" type="primary">已评论</el-tag>
                <el-tag v-else type="warning">待支付</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="时间"
                sortable
                width="180"
                prop="deal.createTime">
            </el-table-column>
            <el-table-column
                label="总额"
                sortable
                width="100"
                prop="deal.total">
            </el-table-column>
            <el-table-column
                label="收货地址"
                width="200"
                prop="deal.shippingAddress">
            </el-table-column>
            <el-table-column
                label="支付方式"
                :filters="[{ text: '支付宝', value: '支付宝' },{ text: '微信', value: '微信' },{ text: '银行卡', value: '银行卡' },{ text: '货到付款', value: '货到付款' }]"
                :filter-method="filterPayWay"
                width="100"
                prop="deal.payWay">
            </el-table-column>
            <el-table-column
                label="订单号"
                sortable
                width="300"
                prop="deal.id">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <el-button v-if="scope.row.deal.state===1" type="text" disabled
                           style="pointer-events: none">无操作
                </el-button>
                <el-button v-else-if="scope.row.deal.state===2" @click="remindShipping" type="text">提醒发货
                </el-button>
                <el-button v-else-if="scope.row.deal.state===3" @click="receipt(scope.row.deal.id)"
                           type="text">确认收货
                </el-button>
                <el-button v-else-if="scope.row.deal.state===4" @click="comment(scope.row.deal.id)"
                           type="text">去评论
                </el-button>
                <el-button v-else-if="scope.row.deal.state===5" type="text" disabled
                           style="pointer-events: none">无操作
                </el-button>
                <div v-else>
                  <el-button @click="pay(scope.row.deal.id)" type="text" size="mini">去支付</el-button>
                  <el-button @click.native.prevent="deleteDeal(dealData,scope.row.deal.id)" type="text" size="mini">取消订单
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-drawer>
        <!--评论的dialog-->
        <el-dialog title="评论" :class="commentContents.length>1?'dialogStyle':''" :visible.sync="commentVisible" width="50%" :before-close="cancelComment">
          <div :class="commentContents.length>1?'dialogContentStyle':''">
            <div v-for="commentContent in commentContents">
              <el-form :model="commentContent">
                <el-row :gutter="20">
                  <el-col :span="9">
                    <el-form-item label="">
                      <el-image :src="commentContent.bookImg" style="width: 200px;height: 250px"></el-image>
                    </el-form-item>
                  </el-col>
                  <el-col :span="15">
                    <div>
                      <el-form-item label="图书名称 : ">
                        {{ commentContent.bookName }}
                      </el-form-item>
                      <el-form-item label="评分 : ">
                        <el-rate style="margin-top: 12px" v-model="commentContent.rate" :colors="colors"
                                 show-text></el-rate>
                      </el-form-item>
                      <el-form-item label="评价内容 : ">
                        <el-input type="textarea" maxlength="60" show-word-limit autosize placeholder="请输入内容"
                                  v-model="commentContent.content"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="commentVisible = false">取 消</el-button>
            <el-button @click="confirmComment" v-loading="loadingBtn" type="primary">提交评论</el-button>
          </div>
        </el-dialog>
        <!--支付的dialog-->
        <el-dialog
            title="支付"
            :visible.sync="payVisible"
            width="30%"
            :before-close="cancelPay">
          <span>请选择支付方式 :</span>
          <el-radio-group v-model="payWay" size="mini" style="margin-top: 10px">
            <el-radio label="支付宝"></el-radio>
            <el-radio label="微信"></el-radio>
            <el-radio label="信用卡"></el-radio>
            <el-radio label="货到付款"></el-radio>
          </el-radio-group>
          <span slot="footer" class="dialog-footer">
            <el-button @click="payVisible = false">取 消</el-button>
            <el-button v-loading="loadingBtn" type="primary" @click="confirmPay">确认支付</el-button>
          </span>
        </el-dialog>

        <!--我的收藏-->
        <el-button id="LogoutBtn" size="medium" icon="el-icon-star-off" @click="showCollectionInfo" type="primary"
                   style="margin-left: 16px;">
          我的收藏
        </el-button>
        <el-drawer
            title="DengDeng-plus"
            :visible.sync="drawer_collection"
            :direction="direction"
            style="width: 150%">
          <el-divider content-position="left"><i class="el-icon-star-on"></i> 我的收藏</el-divider>
          <el-table
              :data="collectionData.filter(data => !search || data.bookName.toLowerCase().includes(search.toLowerCase())
               || data.author.toLowerCase().includes(search.toLowerCase()) || data.press.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%"
              highlight-current-row
              stripe
              v-loading="loading"
              empty-text="这里什么都没有..."
              height="500">
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img :src="scope.row.img" alt="" style="width: 150px;height: 170px">
                  <img slot="reference" :src="scope.row.img" style="width: 50px;height: 55px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
                label="书名"
                prop="bookName"
                width="120">
            </el-table-column>
            <el-table-column
                label="现价"
                prop="discountPrice"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                label="折扣"
                sortable
                prop="discount"
                width="100">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.discount<1" type="success">{{ (scope.row.discount - 1).toFixed(1) * 100 }}%
                </el-tag>
                <el-tag v-else type="info">无</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="定价"
                prop="price"
                sortable
                width="100">
            </el-table-column>
            <el-table-column
                label="作者"
                prop="author"
                width="120">
            </el-table-column>
            <el-table-column
                label="出版社"
                prop="press"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                align="right"
                width="180">
              <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 150px"/>
              </template>
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    icon="el-icon-info"
                    @click="bookDetail_col(scope.row.bookId)">查看详情
                </el-button>
                <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click.native.prevent="deleteRow_col(collectionData,scope.row.bookId)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-drawer>
      </div>
      <div v-else>
        <el-button id="LoginBtn" size="medium" icon="el-icon-user-solid" @click="login" type="primary"
                   style="margin-left: 16px;">
          去登录
        </el-button>
        <el-button id="ShowCartBtn-visitor" size="medium" icon="el-icon-shopping-cart-1" @click="showCartInfo()"
                   type="primary" style="margin-left: 16px;">
          我的购物车
        </el-button>
      </div>
      <!--由于游客也能访问购物车，因此将购物车的dialog提到if-else外面-->
      <el-drawer
          title="DengDeng-plus"
          :visible.sync="drawer_cart"
          :direction="direction"
          style="width: 150%">
        <el-divider content-position="left"><i class="el-icon-shopping-cart-2"></i> 我的购物车</el-divider>
        <el-table
            :data="cartData"
            style="margin-top: 40px;width: 100%;"
            show-summary
            :summary-method="getSummaries"
            highlight-current-row
            v-loading="loading"
            empty-text="这里什么都没有..."
            @selection-change="handleSelectionChange"
            height="500">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-popover placement="right" title="" trigger="hover">
                <img :src="scope.row.img" alt="" style="width: 150px;height: 170px">
                <img slot="reference" :src="scope.row.img" style="width: 50px;height: 55px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
              prop="bookName"
              label="书名"
              width="120">
          </el-table-column>
          <el-table-column
              prop="quantity"
              label="数量"
              sortable
              width="80">
          </el-table-column>
          <el-table-column
              prop="discountPrice"
              label="单价(元)"
              sortable
              width="120">
          </el-table-column>
          <el-table-column
              prop="author"
              label="作者"
              width="120">
          </el-table-column>
          <el-table-column
              prop="press"
              label="出版社"
              width="120">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button @click="bookDetail_cart(scope.row.bookId)" style="margin-left: 5px" type="text"
                         size="medium">查看详情
              </el-button>
              <el-button
                  @click.native.prevent="deleteRow_cart(cartData,scope.row.bookId,scope.row.quantity)"
                  style="margin-left: 15px"
                  type="text"
                  size="medium">
                移除<i class="el-icon-delete"></i>
              </el-button>
              <el-input-number @change="(currentValue,oldValue) => changeQuantity(currentValue,oldValue,scope.row)"
                               v-model="scope.row.quantity" controls-position="right" size="mini"
                               :step="1" step-strictly :min="1" :max="99"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
        <el-button v-if="multipleSelection.length>0" class="CheckBtn" @click="beforeCheck" icon="el-icon-sell" type="primary"
                   round>结算 ({{multipleSelection.length}})
        </el-button>
        <el-button v-else class="CheckBtn" disabled icon="el-icon-sell" type="primary" round>结 算</el-button>
      </el-drawer>
    </div>
    <router-view :key="$route.path"></router-view>
    <!--页面底部-->
    <div class="footer">
      <div class="container">
        <div class="footer-main">
          <h4>ElementUI</h4>
          <a href="https://element.eleme.cn/#/zh-CN" target="_blank" class="footer-main-link">官方网站</a>
          <a href="https://github.com/ElemeFE/element" target="_blank" class="footer-main-link">代码仓库</a>
          <a href="https://github.com/ElemeFE/element/releases" target="_blank" class="footer-main-link">更新日志</a>
          <a href="https://github.com/ElemeFE/element/blob/dev/FAQ.md" target="_blank" class="footer-main-link">常见问题</a>
          <a href="https://gitter.im/ElemeFE/element" target="_blank" class="footer-main-link">在线讨论</a>
          <a href="https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md" target="_blank"
             class="footer-main-link">贡献指南</a>
        </div>
        <div class="footer-main">
          <h4>Vue</h4>
          <a href="https://v3.cn.vuejs.org/" target="_blank" class="footer-main-link">官方网站</a>
          <a href="https://v3.cn.vuejs.org/guide/introduction.html" target="_blank" class="footer-main-link">文档</a>
          <a href="https://v3.cn.vuejs.org/api/" target="_blank" class="footer-main-link">API参考</a>
          <a href="https://next.router.vuejs.org/" target="_blank" class="footer-main-link">Vue Router</a>
          <a href="https://cli.vuejs.org/" target="_blank" class="footer-main-link">Vue CLI</a>
        </div>
        <div class="footer-main">
          <h4>Github</h4>
          <a href="https://github.com" target="_blank" class="footer-main-link">Github社区</a>
          <a href="https://github.com/Dtmmm?tab=repositories" target="_blank"
             class="footer-main-link">在Github上查看项目源码</a>
        </div>
        <div class="footer-social">
          <p class="footer-social-title">
            <span style="font-family: Monotype Corsiva,serif;font-weight: bolder;font-size: 50px;line-height: 2">
              <span style="color: #409EFF;">DengDeng-</span><span style="color: #45d8e7">p</span>
              <span style="color: #3ee343">l</span><span style="color: #ede257">u</span><span
                style="color: #ef846b">s</span>
            </span><br/>
            <span style="float: right">coding by 邓童淼</span><br/><br/><span style="float: right">浙江工业大学</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      userName: '',
      visible: false,
      activeIndex: null,
      drawer_info: false,
      drawer_cart: false,
      drawer_deal: false,
      drawer_collection: false,
      editUserInfo: false,
      checkTable: false,
      editUserInfoRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
        ],
        phoneNumber: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入电子邮箱地址', trigger: 'blur'}
        ],
        shippingAddress: [
          {required: true, message: '请输入收货地址', trigger: 'blur'}
        ]
      },
      direction: 'ltr',
      userInfo: {
        userId: '',
        userName: '',
        phoneNumber: '',
        email: '',
        shippingAddress: '',
        icon: ''
      },
      cartData: [],
      dealData: [
        {
          deal: {
            id: '',
            userId: '',
            shippingAddress: '',
            payWay: '',
            total: '',
            state: '',
            createTime: null,
          },
          dealDetails: [
            {
              bookId: '',
              bookName: '',
              bookPrice: '',
              bookQuantity: '',
              bookImg: ''
            }
          ]
        }],
      collectionData: [{bookId: '', bookName: '', discountPrice: 0, discount: 1, price: 0, author: '', press: ''}],
      search: '',
      loading: true,
      dialogFormVisible: false,
      ruleForm: {
        keyWord: '',
        scope: [],
        options: [{value: 'book_name', label: '书名'},
          {value: 'author', label: '作者名'},
          {value: 'press', label: '出版社'}],
        classification: []
      },
      rules: {
        keyWord: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
        scope: [{required: true, message: '请选择范围', trigger: 'change'}]
      },
      options: [
        {
          value: '1', label: '教育', children: [
            {
              value: '1-1', label: '教材', children: [
                {value: '1-1-1', label: '研究生/本科生/专科生教材'}, {value: '1-1-2', label: '高职高专教材'}, {
                  value: '1-1-3',
                  label: '中职教材'
                }, {value: '1-1-4', label: '成人教育教材'}]
            },
            {
              value: '1-2', label: '外语', children: [
                {value: '1-2-1', label: '英语'}, {value: '1-2-2', label: 'CTE-4/CTE-6'}, {
                  value: '1-2-3',
                  label: '日语'
                }, {value: '1-2-4', label: '韩语'}, {value: '1-2-5', label: '小语种'}]
            },
            {
              value: '1-3', label: '考试', children: [
                {value: '1-3-1', label: '学历考试'}, {value: '1-3-2', label: '公务员'}, {value: '1-3-3', label: '考研'}]
            },
            {
              value: '1-4', label: '工具书', children: [
                {value: '1-4-1', label: '汉语工具书'}, {value: '1-4-2', label: '英语工具书'}, {value: '1-4-3', label: '其他语种工具书'}]
            }
          ]
        },
        {
          value: '2', label: '小说', children: [
            {value: '2-1', label: '科幻小说'}, {value: '2-2', label: '武侠小说'}, {value: '2-3', label: '军事小说'}, {
              value: '2-4',
              label: '情感小说'
            }, {value: '2-5', label: '侦探/悬疑/推理小说'}, {value: '2-6', label: '历史小说'}, {value: '2-7', label: '社会小说'}
          ]
        },
        {
          value: '3', label: '文艺', children: [
            {
              value: '3-1', label: '文学', children: [
                {value: '3-1-1', label: '中国古诗词'}, {value: '3-1-2', label: '民间文学'}, {
                  value: '3-1-3',
                  label: '中国现当代随笔'
                }, {value: '3-1-4', label: '外国随笔'}, {value: '3-1-5', label: '名家作品'}]
            },
            {
              value: '3-2', label: '传记', children: [
                {value: '3-2-1', label: '财经人物'}, {value: '3-2-2', label: '历代帝王'}, {
                  value: '3-2-3',
                  label: '军事人物'
                }, {value: '3-2-4', label: '历史人物'}, {value: '3-2-5', label: '教育家'}]
            },
            {
              value: '3-3', label: '艺术', children: [
                {value: '3-3-1', label: '艺术理论'}, {value: '3-3-2', label: '书法/篆刻'}, {
                  value: '3-3-3',
                  label: '音乐'
                }, {value: '3-3-4', label: '雕塑'}, {value: '3-3-5', label: '绘画'}, {value: '3-3-6', label: '小人书/连环画'}]
            },
            {
              value: '3-4', label: '摄影', children: [
                {value: '3-4-1', label: '摄影理论'}, {value: '3-4-2', label: '摄影入门'}, {value: '3-4-3', label: '摄影进阶'}]
            },
          ]
        },
        {
          value: '4', label: '人文社科', children: [
            {
              value: '4-1', label: '历史', children: [
                {value: '4-1-1', label: '中国史'}, {value: '4-1-2', label: '世界史'}, {
                  value: '4-1-3',
                  label: '历史地理'
                }, {value: '4-1-4', label: '民族史'}]
            },
            {
              value: '4-2', label: '文化', children: [
                {value: '4-2-1', label: '传统文化'}, {value: '4-2-2', label: '各国文化'}]
            },
            {
              value: '4-3', label: '古籍', children: [
                {value: '4-3-1', label: '史类'}, {value: '4-3-2', label: '经部'}, {
                  value: '4-3-3',
                  label: '子部'
                }, {value: '4-3-4', label: '集部'}]
            },
            {
              value: '4-4', label: '心理学', children: [
                {value: '4-4-1', label: '心理百科'}, {value: '4-4-2', label: '心理学著作'}, {value: '4-4-3', label: '社会心理学'}]
            },
            {
              value: '4-5', label: '社会科学', children: [
                {value: '4-5-1', label: '社会科学总论'}, {value: '4-5-2', label: '社会学'}, {value: '4-5-3', label: '文化人类学'}]
            },
            {
              value: '4-6', label: '法律', children: [
                {value: '4-6-1', label: '民法'}, {value: '4-6-2', label: '经济法'}, {
                  value: '4-6-3',
                  label: '刑法'
                }, {value: '4-6-4', label: '理论法学'}, {value: '4-6-5', label: '法律法规'}]
            }
          ]
        },
        {
          value: '5', label: '童书', children: [
            {value: '5-1', label: '科普/百科'}, {value: '5-2', label: '绘本'}, {value: '5-3', label: '文学'}, {
              value: '5-4',
              label: '少儿英语'
            }, {value: '5-5', label: '幼儿启蒙'}, {value: '5-6', label: '动漫卡通'}
          ]
        },
        {
          value: '6', label: '经管', children: [
            {
              value: '6-1', label: '管理', children: [
                {value: '6-1-1', label: '一般管理学'}, {value: '6-1-2', label: '会计'}, {
                  value: '6-1-3',
                  label: '市场/营销'
                }, {value: '6-1-4', label: '管理信息系统'}, {value: '6-1-5', label: '金融/投资'}, {
                  value: '6-1-6',
                  label: 'MBA'
                }, {value: '6-1-7', label: '电子商务'}]
            },
            {
              value: '6-2', label: '投资/理财', children: [
                {value: '6-2-1', label: '证券/股票'}, {value: '6-2-2', label: '基金'}, {
                  value: '6-2-3',
                  label: '期货'
                }, {value: '6-2-4', label: '外汇'}, {value: '6-2-5', label: '保险'}, {value: '6-2-6', label: '纳税'}]
            },
            {
              value: '6-3', label: '经济', children: [
                {value: '6-3-1', label: '经济学理论'}, {value: '6-3-2', label: '区域经济'}, {
                  value: '6-3-3',
                  label: '通货膨胀'
                }, {value: '6-3-4', label: '经济法'}, {value: '6-3-5', label: '统计/审计'}, {value: '6-3-6', label: '经济史'}]
            },
          ]
        },
        {
          value: '7', label: '期刊', children: [
            {value: '7-1', label: '娱乐时尚'}, {value: '7-2', label: '旅游/人文'}, {
              value: '7-3',
              label: '家庭/美食'
            }, {value: '7-4', label: '汽车'}, {value: '7-5', label: 'IT/科技'}
          ]
        },
        {
          value: '8', label: '科技', children: [
            {
              value: '8-1', label: '科普读物', children: [
                {value: '8-1-1', label: '宇宙知识'}, {value: '8-1-2', label: '人类故事'}, {
                  value: '8-1-3',
                  label: '生物世界'
                }, {value: '8-1-4', label: '科学世界'}, {value: '8-1-5', label: '百科知识'}]
            },
            {
              value: '8-2', label: '建筑', children: [
                {value: '8-2-1', label: '建筑科学'}, {value: '8-2-2', label: '建筑史与建筑文化'}, {
                  value: '8-2-3',
                  label: '室内设计/装潢装修'
                }, {value: '8-2-4', label: '园林景观/环境艺术'}, {value: '8-2-5', label: '建筑外观设计'}]
            },
            {
              value: '8-3', label: '医学', children: [
                {value: '8-3-1', label: '预防医学/卫生学'}, {value: '8-3-2', label: '临床医学理论'}, {
                  value: '8-3-3',
                  label: '内科学'
                }, {value: '8-3-4', label: '外科学'}, {value: '8-3-5', label: '妇产科学'}, {
                  value: '8-3-6',
                  label: '儿科学'
                }, {value: '8-3-7', label: '护理学'}, {value: '8-3-8', label: '中医'}, {value: '8-3-9', label: '药学'}]
            },
            {
              value: '8-4', label: '计算机/网络', children: [
                {value: '8-4-1', label: '计算机理论'}, {value: '8-4-2', label: '操作系统'}, {
                  value: '8-4-3',
                  label: '数据库'
                }, {value: '8-4-4', label: '程序设计'}, {value: '8-4-5', label: '网络与通信技术'}, {
                  value: '8-4-6',
                  label: '人工智能'
                }, {value: '8-4-7', label: '信息安全'}]
            },
            {
              value: '8-5', label: '自然科学', children: [
                {value: '8-5-1', label: '数学'}, {value: '8-5-2', label: '力学'}, {
                  value: '8-5-3',
                  label: '物理学'
                }, {value: '8-5-4', label: '化学'}, {value: '8-5-5', label: '天文学'}, {
                  value: '8-5-6',
                  label: '地球科学'
                }, {value: '8-5-7', label: '生物科学'}]
            },
            {
              value: '8-6', label: '工业技术', children: [
                {value: '8-6-1', label: '一般工业技术'}, {value: '8-6-2', label: '机械/仪表工业'}, {
                  value: '8-6-3',
                  label: '电工技术'
                }, {value: '8-6-4', label: '冶金工业'}, {value: '8-6-5', label: '能源与动力工程'}]
            }
          ]
        },
        {
          value: '9', label: '成功/励志', children: [
            {value: '9-1', label: '人生哲学'}, {value: '9-2', label: '成功/激励'}, {
              value: '9-3',
              label: '心理与修养'
            }, {value: '9-4', label: '性格与习惯'}, {value: '9-5', label: '人际交往'}, {value: '9-6', label: '礼仪'}
          ]
        }
      ],
      payWay: '支付宝',
      total: 0,
      loadingBtn: false,
      payVisible: false,
      dealId: '',
      commentVisible: false,
      commentContents: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dealId_comment: '',
      multipleSelection: [],
      visitorId: ''
    };
  },
  created() {
    this.activeIndex = null;
    this.id = sessionStorage.getItem("id");
    this.userName = sessionStorage.getItem("userName");
    if (sessionStorage.getItem("id") == null){
      let visitorId = this.getVisitorId();
      sessionStorage.setItem("visitorId",visitorId);
      this.visitorId = visitorId;
    }
  },
  methods: {
    // 为游客生成id
    getVisitorId(){
      let s = [];
      let hexDigits = '0123456789abcdef';
      for (let i = 0; i < 24; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

      let id = "visitor_"+s.join('');
      return id;
    },
    // 打开我的Github
    openGithub() {
      this.visible = false;
      window.open("https://github.com/Dtmmm?tab=repositories", "_blank");
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    // 导航栏跳转功能
    jump(path) {
      this.$router.push({name: 'CategoryDisplay', params: {myArg: path}});
    },
    // 打开个人信息
    showUserInfo() {
      axios.get("http://localhost:8081/user/selectUserById/" + this.id)
          .then((resp) => {
            this.userInfo = resp.data;
          })
      this.drawer_info = true;
    },
    // 打开修改个人信息的对话框
    editUserInfoFunction() {
      this.drawer_info = false;
      this.editUserInfo = true;
    },
    // 确认修改
    submitEdit(formName) {
      // 1.验证表单内容
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 2.用户二次确认
          this.$confirm('确认修改？').then(_ => {
            // 3.修改
            let data = {
              id: this.id,
              userName: this.userInfo.userName,
              phoneNumber: this.userInfo.phoneNumber,
              email: this.userInfo.email,
              shippingAddress: this.userInfo.shippingAddress
            };
            axios.put("http://localhost:8081/user/updateUser",data)
                .then((resp) => {
                  if (resp.data === 1) {
                    sessionStorage.setItem("userName", this.userInfo.userName);
                    this.userName = this.userInfo.userName;
                    this.editUserInfo = false;
                    this.$message({
                      showClose: true,
                      center: true,
                      type: 'success',
                      message: '修改成功！即将打开个人信息'
                    });
                    // 延迟1000毫秒打开我的个人信息
                    setTimeout(() => {
                      this.drawer_info = true;
                    }, 1000)
                  } else {
                    this.editUserInfo = false;
                    this.$message({
                      showClose: true,
                      center: true,
                      type: 'error',
                      message: '修改失败，请重试'
                    });
                  }
                })
          }).catch(_ => {
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置修改
    resetEdit(formName) {
      this.$refs[formName].resetFields();
    },
    // 关闭修改个人信息的对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    // 打开购物车
    showCartInfo() {
      // 判断是否是游客
      let id = sessionStorage.getItem("id")==null?this.visitorId:this.id;
      this.loading = true;
      this.drawer_cart = true;
      axios.get("http://localhost:8081/user/cartInfo/" + id)
          .then((resp) => {
            this.cartData = resp.data;
            this.loading = false;
          });
    },
    // 从购物车中删除一行
    deleteRow_cart(rows, bookId, quantity) {
      this.$confirm('确认从购物车中移除此图书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 判断是否是游客，获取id
        let id = sessionStorage.getItem("id")==null?this.visitorId:this.id;
        let data = {
          id: id,
          bookId: bookId,
          quantity: quantity
        };
        axios.post("http://localhost:8081/user/deleteCart",data)
            .then((resp) => {
              if (resp.data === 1) {
                this.myDelete_cart(rows, bookId);
                this.$message({
                  type: 'success',
                  message: '移除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '移除失败，请刷新后重试'
                });
              }
            });
      })
    },
    // 自定义的删除数组的方法
    myDelete_cart(rows, id){
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].bookId === id) {
          rows.splice(i,1);
        }
      }
    },
    // 从购物车中跳转到图书详情页
    bookDetail_cart(bookId) {
      this.drawer_cart = false;
      this.$router.push({name: 'BookDetail', params: {id: bookId}});
    },
    // 购物车价格总计
    getSummaries(param) {
      const sums = [];
      let total = 0;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        total += this.multipleSelection[i].quantity * this.multipleSelection[i].discountPrice;
      }
      sums[1] = '总计 :';
      sums[2] = total.toFixed(2) + ' (元)';
      this.total = parseFloat(total.toFixed(2));
      return sums;
    },
    // 改变购物车中图书数量
    changeQuantity(currentValue, oldValue, row) {
      // 判断是否是游客，获取id
      let id = sessionStorage.getItem("id")==null?this.visitorId:this.id;
      /*let formData = new FormData();
      formData.append("id", id);
      formData.append("bookId", row.bookId);
      formData.append("quantity", row.quantity);
      formData.append("currentValue", currentValue);
      formData.append("oldValue", oldValue);*/
      let data = {
        id: id,
        bookId: row.bookId,
        quantity: currentValue-oldValue
      };
      /*axios({
        method: "post",
        url: "http://localhost:8081/user/changeQuantity",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: formData
      })*/
      axios.put("http://localhost:8081/user/changeQuantity",data)
          .then((resp) => {
            if (resp.data === 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '修改失败，请刷新后重试'
              });
            }
          });
    },
    // 选中的行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 结算功能
    beforeCheck() {
      if (sessionStorage.getItem("id") == null){
        this.$message({
          type: 'warning',
          message: '您还未登录，登录后才能进行结算！'
        });
      } else {
        this.drawer_cart = false;
        this.loading = true;
        this.checkTable = true;
        this.payWay = '支付宝';
        axios.get("http://localhost:8081/user/selectUserById/" + this.id)
            .then((resp) => {
              this.userInfo = resp.data;
              this.loading = false;
            });
      }
    },
    // 结算
    check(state) {
      this.loadingBtn = true;
      let deal = {
        userId: this.id,
        shippingAddress: this.userInfo.shippingAddress,
        total: this.total,
        payWay: this.payWay,
        state: state
      };
      let dealDetails = this.getDealDetails();
      axios.post("http://localhost:8081/deal/check", {deal: deal, dealDetails: dealDetails})
          .then((resp) => {
            this.loadingBtn = false;
            this.checkTable = false;
            this.payWay = "支付宝";
            if (resp.data === 1) {
              if (state === 2) {
                this.$message({
                  showClose: true,
                  type: 'success',
                  message: '结算成功！'
                });
              }
              if (state === 6) {
                this.$message({
                  showClose: true,
                  type: 'warning',
                  message: '您有一笔新的待支付订单，请尽快在 我的订单 中处理'
                });
              }
            } else {
              this.$message({
                showClose: true,
                type: 'error',
                message: '结算失败，请重试'
              });
            }
          });
    },
    // 组装订单详情
    getDealDetails() {
      let dealDetails = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let dealDetail = {
          bookId: this.multipleSelection[i].bookId,
          bookName: this.multipleSelection[i].bookName,
          bookPrice: this.multipleSelection[i].discountPrice,
          bookQuantity: this.multipleSelection[i].quantity,
          bookImg: this.multipleSelection[i].img
        };
        dealDetails.push(dealDetail);
      }
      return dealDetails;
    },
    // 取消结算
    cancelCheck() {
      this.$confirm('确认取消支付？未支付的订单稍后可在 我的订单 中重新支付')
          .then(_ => {
            this.check(6);
            this.payWay = "支付宝";
          })
          .catch(_ => {
          });
    },
    // 打开我的订单
    showDealInfo() {
      this.loading = true;
      this.drawer_deal = true;
      axios.get("http://localhost:8081/deal/selectDealInfo/" + this.id)
          .then((resp) => {
            this.loading = false;
            this.dealData = resp.data;
          });
    },
    // 订单状态筛选功能-状态筛选
    filterState(value, row) {
      return row.deal.state === value;
    },
    // 订单状态筛选功能-支付方式筛选
    filterPayWay(value, row) {
      return row.deal.payWay === value;
    },
    // 提醒发货
    remindShipping() {
      this.$message({
        showClose: true,
        message: '提醒成功，会尽快为您安排发货',
        type: 'success'
      });
    },
    // 收货
    receipt(id) {
      this.$confirm('确认签收?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        axios.post("http://localhost:8081/deal/updateDealState/"+id+"/4")
            .then((resp) => {
              this.loading = false;
              if (resp.data === 1) {
                for (let i = 0; i < this.dealData.length; i++) {
                  if (this.dealData[i].deal.id === id){
                    this.dealData[i].deal.state = 4;
                    break;
                  }
                }
                this.$message({
                  message: '签收成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '签收失败，请重试',
                  type: 'error'
                });
              }
            });
      })
    },
    // 去评论
    comment(id) {
      this.commentContents = [];
      let dealDetails;
      //根据deal的id取到dealDetails
      for (let i = 0; i < this.dealData.length; i++) {
        if (this.dealData[i].deal.id === id){
          dealDetails = this.dealData[i].dealDetails;
          break;
        }
      }
      console.log(dealDetails);
      for (let i = 0; i < dealDetails.length; i++) {
        // 使用this.$set方法动态设置data的数据
        this.$set(this.commentContents, i,
            {
              'bookId': dealDetails[i].bookId,
              'bookName': dealDetails[i].bookName,
              'userId': this.id,
              'userName': this.userName,
              'rate': 5,
              'bookImg': dealDetails[i].bookImg,
              content: null
            });
      }
      this.dealId_comment = id;
      this.commentVisible = true;
    },
    // 取消评论
    cancelComment(done) {
      this.$confirm('确认取消评论？').then(_ => {
        done();
      }).catch(_ => {
      });
    },
    // 确认评论
    confirmComment() {
      this.commentVisible = false;
      this.loadingBtn = true;
      axios.post("http://localhost:8081/comment/insertComment",this.commentContents)
          .then((resp) => {
            this.loadingBtn = false;
            if (resp.data === 1){
              this.loading = true;
              axios.post("http://localhost:8081/deal/updateDealState/"+this.dealId_comment+"/5")
                  .then((_resp) => {
                this.loading = false;
                if (_resp.data === 1) {
                  for (let i = 0; i < this.dealData.length; i++) {
                    if (this.dealData[i].deal.id === this.dealId_comment){
                      this.dealData[i].deal.state = 5;
                      break;
                    }
                  }
                  this.$message({
                    message: '评论成功',
                    type: 'success'
                  });
                }
              });
            } else {
              this.$message({
                message: '评论失败，请重试',
                type: 'error'
              });
            }
          });
    },
    // 去支付
    pay(dealId) {
      this.payWay = '支付宝';
      this.dealId = dealId;
      this.payVisible = true;
    },
    // 取消支付
    cancelPay(done) {
      this.$confirm('确认取消支付？').then(_ => {
        done();
      }).catch(_ => {
      });
    },
    // 确认支付
    confirmPay() {
      this.drawer_deal = false;
      this.payVisible = false;
      this.loadingBtn = true;
      axios.get("http://localhost:8081/deal/pay/"+this.dealId+"/"+this.payWay)
      .then((resp) => {
        this.loadingBtn = false;
        if (resp.data === 1) {
          this.$message({
            showClose: true,
            type: 'success',
            message: '支付成功！'
          });
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '支付失败，请重试'
          });
        }
      });
    },
    // 取消订单
    deleteDeal(rows, id) {
      this.$confirm('确认取消该订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("http://localhost:8081/deal/deleteDeal/"+id)
        .then((resp) => {
          if (resp.data === 1) {
            this.myDelete_deal(rows,id);
            this.$message({
              showClose: true,
              type: 'success',
              message: '取消订单成功！'
            });
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '取消订单成功失败，请重试'
            });
          }
        });
      });
    },
    // 自定义的删除数组的方法
    myDelete_deal(rows, id){
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].deal.id === id) {
          rows.splice(i,1);
          break;
        }
      }
    },
    // 从购物车中跳转到图书详情页
    bookDetail_deal(bookId) {
      this.drawer_deal = false;
      this.$router.push({name: 'BookDetail', params: {id: bookId}});
    },
    // 打开收藏夹
    showCollectionInfo() {
      this.loading = true;
      this.drawer_collection = true;
      axios.get("http://localhost:8081/user/collectionInfo/" + this.id)
          .then((resp) => {
            this.collectionData = resp.data;
            this.loading = false;
          });
    },
    // 从收藏夹中跳转到图书详情页
    bookDetail_col(bookId) {
      this.drawer_collection = false;
      this.$router.push({name: 'BookDetail', params: {id: bookId}});
    },
    // 从收藏夹中删除一行
    deleteRow_col(rows, bookId) {
      this.$confirm('确认从收藏夹中移除此图书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("http://localhost:8081/user/deleteCollection/"+this.id+"/"+bookId)
            .then((resp) => {
              if (resp.data === 1) {
                this.myDelete_col(rows, bookId);
                this.$message({
                  type: 'success',
                  message: '移除成功!'
                });
              } else {
                this.$message({
                  type: 'error',
                  message: '移除失败，请刷新后重试'
                });
              }
            });
      })
    },
    // 自定义的删除数组的方法
    myDelete_col(rows, id){
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].bookId === id) {
          rows.splice(i,1);
          break;
        }
      }
    },
    // 搜索功能
    Search(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const classification = this.spliceClassification(this.ruleForm.classification);
          this.$router.push({
            path: '/SearchDisplay',
            // 使用 JSON.stringify() 方法先转为Json字符串，接收的时候再转回对象
            query: {
              keyWord: JSON.stringify(this.ruleForm.keyWord),
              scope: JSON.stringify(this.ruleForm.scope),
              classification: JSON.stringify(classification)
            }
          });
          this.dialogFormVisible = false;
          this.activeIndex = null;
          this.$refs[form].resetFields();
          this.ruleForm.classification = [];
        } else {
          return false;
        }
      });
    },
    // 遍历数组，拼接出用户选中的分类
    spliceClassification(array) {
      const result = [];
      for (let i = 0, len = array.length; i < len; i++) {
        let arr = array[i];
        for (let j = 0, len = arr.length; j < len; j++) {
          if (j === arr.length - 1) {
            result.push(arr[j]);
          }
        }
      }
      return result;
    },
    // 取消搜索
    CancelSearch(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
      this.ruleForm.classification = [];
    },
    // 登录
    login() {
      this.$router.push("/Login");
    },
    // 登出
    logout() {
      this.userName = null;
      sessionStorage.clear();
      // 重新生成一个游客的编号
      let visitorId = this.getVisitorId();
      sessionStorage.setItem("visitorId",visitorId);
      this.visitorId = visitorId;
    },
    // 点击Logo，跳回主页
    clickLogo() {
      this.activeIndex = null;
      this.$router.push("/Home");
    }
  }
}
</script>

<style scoped>
#Logo {
  font-size: 40px;
  font-weight: bolder;
  font-family: Monotype Corsiva, Consolas, serif;
  margin-top: 15px;
  margin-left: 15px;
  cursor: pointer;
  width: 250px;
}

#NavigationBarContainer {
  margin-top: 40px;
}

.el-menu {
  margin: 0 auto;
  width: 1250px;
  padding-left: 20px;
  border-radius: 15px;
  box-shadow: 16px 16px 32px #d9d9d9, -16px -16px 32px #ffffff;
}

.el-submenu {
  padding-left: 10px;
}

#SearchBtn {
  margin-top: 10px;
  margin-left: 35px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

#ShowInfoBtn {
  text-align: center;
  position: fixed;
  width: 135px;
  margin-left: 15px;
  margin-top: 140px;
}

#ShowCartBtn {
  text-align: center;
  position: fixed;
  width: 135px;
  margin-left: 15px;
  margin-top: 185px;
}

#ShowOrderBtn {
  text-align: center;
  position: fixed;
  width: 135px;
  margin-left: 15px;
  margin-top: 230px;
}

#LoginBtn {
  text-align: center;
  position: fixed;
  width: 135px;
  margin-left: 15px;
  margin-top: 185px;
}

#LogoutBtn {
  text-align: center;
  position: fixed;
  width: 135px;
  margin-left: 15px;
  margin-top: 275px;
}

#ShowCartBtn-visitor {
  text-align: center;
  position: fixed;
  width: 135px;
  margin-left: 15px;
  margin-top: 230px;
}

#EditUserInfoBtn {
  margin-top: 20px;
  margin-left: 330px;
}

.CheckBtn {
  margin-top: 20px;
  margin-left: 560px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

#eachOrderInfo {
  margin-left: 30px;
  margin-top: 10px;
  height: 70px;
}

.dialogStyle {
  overflow: hidden;
  margin-top: -110px;
}

.dialogContentStyle {
  height: 500px;
  padding: 15px;
  overflow-y: auto;
}

.footer {
  background-color: #f7fbfd;
  width: 100%;
  padding: 40px 150px;
  margin-top: 20px;
  box-sizing: border-box;
  height: 300px;
}

.footer .container {
  box-sizing: border-box;
  width: auto;
}

.footer .footer-main {
  font-size: 0;
  display: inline-block;
  vertical-align: top;
  margin-right: 110px;
}

.footer .footer-main h4 {
  font-size: 18px;
  color: #333;
  line-height: 1;
  margin: 0 0 15px;
}

.footer .footer-main .footer-main-link {
  display: block;
  margin: 0;
  line-height: 2;
  font-size: 14px;
  color: #666;
  text-decoration: none;
}

.footer .footer-main .footer-main-link:hover {
  color: #222222;
}

.footer .footer-social {
  float: right;
  text-align: right;
}

.footer .footer-social .footer-social-title {
  color: #666;
  font-size: 18px;
  line-height: 1;
  margin: 0 0 20px;
  padding: 0;
  font-weight: 700;
}
</style>
