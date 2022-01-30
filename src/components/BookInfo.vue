<template>
  <div>
    <el-button @click="initData" size="small" icon="el-icon-refresh" plain>重置</el-button>
    <el-button @click="addBook" type="primary" size="small" icon="el-icon-circle-plus-outline">添加新书</el-button>
    <el-input id="keyWord" placeholder="请输入关键字" v-model="keyWord" style="width: 400px;left: 670px" size="medium" clearable>
      <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 100px">
        <el-option label="书名" value="book_name"></el-option>
        <el-option label="作者" value="author"></el-option>
        <el-option label="出版社" value="press"></el-option>
        <el-option label="编号" value="id"></el-option>
      </el-select>
      <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div id="table">
      <el-table v-loading="loading" empty-text="这里空空如也..." stripe height="502px" :data="bookData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-expand">
              <el-row :gutter="20">
                <el-col :span="4">
                  <div class="img">
                    <el-image :src="props.row.img"></el-image>
                  </div>
                </el-col>
                <el-col :span="20">
                  <el-descriptions :title="props.row.bookName">
                    <el-descriptions-item label="编号">{{ props.row.id }}</el-descriptions-item>
                    <el-descriptions-item label="书名">{{ props.row.bookName }}</el-descriptions-item>
                    <el-descriptions-item label="作者">{{ props.row.author }}</el-descriptions-item>
                    <el-descriptions-item label="价格">{{ props.row.price }}</el-descriptions-item>
                    <el-descriptions-item label="出版社">{{ props.row.press }}</el-descriptions-item>
                    <el-descriptions-item label="出版日期">{{ props.row.publicationDate }}</el-descriptions-item>
                    <el-descriptions-item label="库存">{{ props.row.inventory }}</el-descriptions-item>
                    <el-descriptions-item label="累计销售量">{{ props.row.sales }}</el-descriptions-item>
                    <el-descriptions-item label="状态">{{ props.row.state }}</el-descriptions-item>
                    <el-descriptions-item label="折扣">{{ props.row.discount }}</el-descriptions-item>
                    <el-descriptions-item label="类别">{{ props.row.classificationCode }}</el-descriptions-item>
                    <el-descriptions-item label="图片">{{ props.row.img }}</el-descriptions-item>
                    <el-descriptions-item label="简介" :labelStyle="'width:45px;'">{{ props.row.brief }}
                    </el-descriptions-item>
                  </el-descriptions>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            type="index"
            width="40">
        </el-table-column>
        <el-table-column
            label="书名"
            prop="bookName">
        </el-table-column>
        <el-table-column
            label="作者"
            prop="author">
        </el-table-column>
        <el-table-column
            label="价格"
            prop="price"
            sortable
            width="90px">
        </el-table-column>
        <el-table-column
            label="折扣"
            prop="discount"
            sortable
            width="90px">
        </el-table-column>
        <el-table-column
            label="库存"
            prop="inventory"
            sortable
            width="100px">
        </el-table-column>
        <el-table-column
            label="类别"
            prop="classificationCode"
            width="200px">
        </el-table-column>
        <el-table-column
            label="出版社"
            prop="press">
        </el-table-column>
        <el-table-column
            label="操作"
            width="200px">
          <template slot-scope="scope">
            <el-button @click="editBook(scope.row.id)" type="primary" icon="el-icon-edit"
                       size="small" style="margin-right: 15px">编辑
            </el-button>
            <el-popconfirm
                confirm-button-text='删除'
                cancel-button-text='取消'
                confirm-button-type="danger"
                icon="el-icon-info"
                title="确认删除此书？"
                @confirm="deleteRow(bookData,scope.row.id)">
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          @current-change="page"
          :hide-on-single-page="true"
          :current-page="currentPage"
          v-if="total!=null">
      </el-pagination>
    </div>

    <!--
    这里给dialog加上v-if，以解决表单重置时，数据出错的问题
    form表单的重置是以第一次打开的数据作为重置标准,之后的重置都会恢复到第一次更新的数据
    利用v-if的特性，进行form的销毁和重建，强行让每一次改操作拿到的数据为父组件传过来的初始值
    -->
    <el-dialog title="编辑" :visible.sync="editBookVisible" v-if="editBookVisible" width="60%" style="margin-top: -50px">
      <el-form :inline="true" :model="book" :rules="rules" ref="editBook" label-width="100px" status-icon>
        <el-form-item label="编号">
          <el-input v-model="book.id" readonly style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="bookName">
          <el-input v-model.trim="book.bookName" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model.trim="book.author" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="book.price" :precision="1" :controls="false" :min="0"
                           style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model.trim="book.press" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publicationDate">
          <el-date-picker value-format="yyyy-MM" format="yyyy-MM" type="month"
                          placeholder="选择日期" v-model="book.publicationDate" style="width: 300px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input-number v-model="book.inventory" step-strictly :min="0" style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="累计销售量" prop="sales">
          <el-input-number v-model="book.sales" step-strictly :min="0" style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="book.state" placeholder="请选择状态" style="width: 300px">
            <el-option label="最新上架" :value="1"></el-option>
            <el-option label="独家畅品" :value="2"></el-option>
            <el-option label="重点推荐" :value="3"></el-option>
            <el-option label="好评发售" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input-number v-model="book.discount" :precision="2" :step="0.01" step-strictly :max="1" :min="0"
                           style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="分类" prop="classificationCode">
          <el-select v-model="book.classificationCode" filterable placeholder="试试搜索小说">
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label">
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input v-model="book.img" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="book.brief" clearable
                    style="width: 500px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editBook')">重 置</el-button>
        <el-button type="primary" @click="submitEdit('editBook')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" destroy-on-close :visible.sync="addBookVisible" v-if="addBookVisible" width="60%" style="margin-top: -50px">
      <el-form :inline="true" :model="book_add" :rules="rules" ref="addBook" label-width="100px" status-icon>
        <el-form-item label="编号">
          <el-input v-model="book_add.id" readonly style="width: 300px" placeholder="编号由数据库生成"></el-input>
        </el-form-item>
        <el-form-item label="书名" prop="bookName">
          <el-input v-model.trim="book_add.bookName" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model.trim="book_add.author" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="book_add.price" :precision="1" :controls="false" :min="0"
                           style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model.trim="book_add.press" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" prop="publicationDate">
          <el-date-picker value-format="yyyy-MM" format="yyyy-MM" type="month"
                          placeholder="选择日期" v-model="book_add.publicationDate" style="width: 300px;"></el-date-picker>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input-number v-model="book_add.inventory" step-strictly :min="0" style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="累计销售量" prop="sales">
          <el-input-number v-model="book_add.sales" step-strictly :min="0" style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="book_add.state" placeholder="请选择状态" style="width: 300px">
            <el-option label="无" :value="0"></el-option>
            <el-option label="最新上架" :value="1"></el-option>
            <el-option label="独家畅品" :value="2"></el-option>
            <el-option label="重点推荐" :value="3"></el-option>
            <el-option label="好评发售" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input-number v-model="book_add.discount" :precision="2" :step="0.01" step-strictly :max="1" :min="0"
                           style="width: 300px"></el-input-number>
        </el-form-item>
        <el-form-item label="分类" prop="classificationCode">
          <el-select v-model="book_add.classificationCode" filterable placeholder="试试搜索：小说">
            <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label">
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <el-input v-model="book_add.img" clearable style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model.trim="book_add.brief" clearable
                    style="width: 500px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('addBook')">重 置</el-button>
        <el-button type="primary" @click="submitAdd('addBook')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BookInfo",
  data() {
    return {
      bookData: null,
      total: null,
      loading: true,
      keyWord: '',
      select: 'book_name',
      book: {
        id: '', bookName: '', author: '', price: 0, press: '', publicationDate: '',
        inventory: 0, sales: 0, brief: '', state: 0, discount: 1, classificationCode: '', img: ''
      },
      book_add: {
        id: '', bookName: '', author: '', price: 0, press: '', publicationDate: '',
        inventory: 2000, sales: 0, brief: '', state: 0, discount: 1, classificationCode: '', img: '/static/img/book/'
      },
      editBookVisible: false,
      addBookVisible: false,
      rules: {
        bookName: [
          {required: true, message: '请输入书名', trigger: 'blur'}
        ],
        author: [
          {required: true, message: '请输入作者名', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'}
        ],
        press: [
          {required: true, message: '请输入出版社名称', trigger: 'blur'}
        ],
        publicationDate: [
          {required: true, message: '请选择出版日期', trigger: 'change'}
        ],
        inventory: [
          {required: true, message: '请输入库存', trigger: 'blur'}
        ],
        sales: [
          {required: true, message: '请输入累计销售量', trigger: 'blur'}
        ],
        brief: [
          {required: true, message: '请输入简介', trigger: 'blur'}
        ],
        state: [
          {required: true, message: '请选择一个状态', trigger: 'blur'}
        ],
        discount: [
          {required: true, message: '请输入折扣', trigger: 'blur'}
        ],
        classificationCode: [
          {required: true, message: '请选择一个分类', trigger: 'blur'}
        ],
        img: [
          {required: false, message: '请选择图片', trigger: 'blur'}
        ]
      },
      options: [
        {
          label: '教材', options: [
            {value: '1-1-1', label: '研究生/本科生/专科生教材'}, {value: '1-1-2', label: '高职高专教材'}, {
              value: '1-1-3',
              label: '中职教材'
            }, {value: '1-1-4', label: '成人教育教材'}]
        },
        {
          label: '外语', options: [
            {value: '1-2-1', label: '英语'}, {value: '1-2-2', label: 'CTE-4/CTE-6'}, {
              value: '1-2-3',
              label: '日语'
            }, {value: '1-2-4', label: '韩语'}, {value: '1-2-5', label: '小语种'}]
        },
        {
          label: '考试', options: [
            {value: '1-3-1', label: '学历考试'}, {value: '1-3-2', label: '公务员'}, {value: '1-3-3', label: '考研'}]
        },
        {
          label: '工具书', options: [
            {value: '1-4-1', label: '汉语工具书'}, {value: '1-4-2', label: '英语工具书'}, {value: '1-4-3', label: '其他语种工具书'}]
        }
        ,
        {
          label: '小说', options: [
            {value: '2-1', label: '科幻小说'}, {value: '2-2', label: '武侠小说'}, {value: '2-3', label: '军事小说'}, {
              value: '2-4',
              label: '情感小说'
            }, {value: '2-5', label: '侦探/悬疑/推理小说'}, {value: '2-6', label: '历史小说'}, {value: '2-7', label: '社会小说'}
          ]
        },
        {
          label: '文学', options: [
            {value: '3-1-1', label: '中国古诗词'}, {value: '3-1-2', label: '民间文学'}, {
              value: '3-1-3',
              label: '中国现当代随笔'
            }, {value: '3-1-4', label: '外国随笔'}, {value: '3-1-5', label: '名家作品'}]
        },
        {
          label: '传记', options: [
            {value: '3-2-1', label: '财经人物'}, {value: '3-2-2', label: '历代帝王'}, {
              value: '3-2-3',
              label: '军事人物'
            }, {value: '3-2-4', label: '历史人物'}, {value: '3-2-5', label: '教育家'}]
        },
        {
          label: '艺术', options: [
            {value: '3-3-1', label: '艺术理论'}, {value: '3-3-2', label: '书法/篆刻'}, {
              value: '3-3-3',
              label: '音乐'
            }, {value: '3-3-4', label: '雕塑'}, {value: '3-3-5', label: '绘画'}, {value: '3-3-6', label: '小人书/连环画'}]
        },
        {
          label: '摄影', options: [
            {value: '3-4-1', label: '摄影理论'}, {value: '3-4-2', label: '摄影入门'}, {value: '3-4-3', label: '摄影进阶'}]
        }
        ,
        {
          label: '历史', options: [
            {value: '4-1-1', label: '中国史'}, {value: '4-1-2', label: '世界史'}, {
              value: '4-1-3',
              label: '历史地理'
            }, {value: '4-1-4', label: '民族史'}]
        },
        {
          label: '文化', options: [
            {value: '4-2-1', label: '传统文化'}, {value: '4-2-2', label: '各国文化'}]
        },
        {
          label: '古籍', options: [
            {value: '4-3-1', label: '史类'}, {value: '4-3-2', label: '经部'}, {
              value: '4-3-3',
              label: '子部'
            }, {value: '4-3-4', label: '集部'}]
        },
        {
          label: '心理学', options: [
            {value: '4-4-1', label: '心理百科'}, {value: '4-4-2', label: '心理学著作'}, {value: '4-4-3', label: '社会心理学'}]
        },
        {
          label: '社会科学', options: [
            {value: '4-5-1', label: '社会科学总论'}, {value: '4-5-2', label: '社会学'}, {value: '4-5-3', label: '文化人类学'}]
        },
        {
          label: '法律', options: [
            {value: '4-6-1', label: '民法'}, {value: '4-6-2', label: '经济法'}, {
              value: '4-6-3',
              label: '刑法'
            }, {value: '4-6-4', label: '理论法学'}, {value: '4-6-5', label: '法律法规'}]
        },
        {
          label: '童书', options: [
            {value: '5-1', label: '科普/百科'}, {value: '5-2', label: '绘本'}, {value: '5-3', label: '文学'}, {
              value: '5-4',
              label: '少儿英语'
            }, {value: '5-5', label: '幼儿启蒙'}, {value: '5-6', label: '动漫卡通'}
          ]
        },
        {
          label: '管理', options: [
            {value: '6-1-1', label: '一般管理学'}, {value: '6-1-2', label: '会计'}, {
              value: '6-1-3',
              label: '市场/营销'
            }, {value: '6-1-4', label: '管理信息系统'}, {value: '6-1-5', label: '金融/投资'}, {
              value: '6-1-6',
              label: 'MBA'
            }, {value: '6-1-7', label: '电子商务'}]
        },
        {
          label: '投资/理财', options: [
            {value: '6-2-1', label: '证券/股票'}, {value: '6-2-2', label: '基金'}, {
              value: '6-2-3',
              label: '期货'
            }, {value: '6-2-4', label: '外汇'}, {value: '6-2-5', label: '保险'}, {value: '6-2-6', label: '纳税'}]
        },
        {
          label: '经济', options: [
            {value: '6-3-1', label: '经济学理论'}, {value: '6-3-2', label: '区域经济'}, {
              value: '6-3-3',
              label: '通货膨胀'
            }, {value: '6-3-4', label: '经济法'}, {value: '6-3-5', label: '统计/审计'}, {value: '6-3-6', label: '经济史'}]
        },
        {
          label: '期刊', options: [
            {value: '7-1', label: '娱乐时尚'}, {value: '7-2', label: '旅游/人文'}, {
              value: '7-3',
              label: '家庭/美食'
            }, {value: '7-4', label: '汽车'}, {value: '7-5', label: 'IT/科技'}
          ]
        },
        {
          label: '科普读物', options: [
            {value: '8-1-1', label: '宇宙知识'}, {value: '8-1-2', label: '人类故事'}, {
              value: '8-1-3',
              label: '生物世界'
            }, {value: '8-1-4', label: '科学世界'}, {value: '8-1-5', label: '百科知识'}]
        },
        {
          label: '建筑', options: [
            {value: '8-2-1', label: '建筑科学'}, {value: '8-2-2', label: '建筑史与建筑文化'}, {
              value: '8-2-3',
              label: '室内设计/装潢装修'
            }, {value: '8-2-4', label: '园林景观/环境艺术'}, {value: '8-2-5', label: '建筑外观设计'}]
        },
        {
          label: '医学', options: [
            {value: '8-3-1', label: '预防医学/卫生学'}, {value: '8-3-2', label: '临床医学理论'}, {
              value: '8-3-3',
              label: '内科学'
            }, {value: '8-3-4', label: '外科学'}, {value: '8-3-5', label: '妇产科学'}, {
              value: '8-3-6',
              label: '儿科学'
            }, {value: '8-3-7', label: '护理学'}, {value: '8-3-8', label: '中医'}, {value: '8-3-9', label: '药学'}]
        },
        {
          label: '计算机/网络', options: [
            {value: '8-4-1', label: '计算机理论'}, {value: '8-4-2', label: '操作系统'}, {
              value: '8-4-3',
              label: '数据库'
            }, {value: '8-4-4', label: '程序设计'}, {value: '8-4-5', label: '网络与通信技术'}, {
              value: '8-4-6',
              label: '人工智能'
            }, {value: '8-4-7', label: '信息安全'}]
        },
        {
          label: '自然科学', options: [
            {value: '8-5-1', label: '数学'}, {value: '8-5-2', label: '力学'}, {
              value: '8-5-3',
              label: '物理学'
            }, {value: '8-5-4', label: '化学'}, {value: '8-5-5', label: '天文学'}, {
              value: '8-5-6',
              label: '地球科学'
            }, {value: '8-5-7', label: '生物科学'}]
        },
        {
          label: '工业技术', options: [
            {value: '8-6-1', label: '一般工业技术'}, {value: '8-6-2', label: '机械/仪表工业'}, {
              value: '8-6-3',
              label: '电工技术'
            }, {value: '8-6-4', label: '冶金工业'}, {value: '8-6-5', label: '能源与动力工程'}]
        },
        {
          label: '成功/励志', options: [
            {value: '9-1', label: '人生哲学'}, {value: '9-2', label: '成功/激励'}, {
              value: '9-3',
              label: '心理与修养'
            }, {value: '9-4', label: '性格与习惯'}, {value: '9-5', label: '人际交往'}, {value: '9-6', label: '礼仪'}
          ]
        }
      ],
      currentPage: 1
    }
  },
  methods: {
    // 翻页功能
    page(currentPage) {
      this.loading = true;
      axios.get("http://localhost:8081/backstage/selectBookInfo/" + currentPage + "/10")
          .then((resp) => {
            this.bookData = resp.data.books;
            this.total = resp.data.total;
            this.loading = false;
          });
    },
    // 模糊搜索
    search() {
      if (this.keyWord.trim() === '') {
        this.$message.error('关键字不能为空!');
      } else {
        this.loading = true;
        this.total = null;
        axios.get("http://localhost:8081/backstage/searchBookInfo/" + this.keyWord + "/" + this.select)
            .then((resp) => {
              this.bookData = resp.data;
              this.loading = false;
            })
      }
    },
    // 删除
    deleteRow(rows, id) {
      let formData = new FormData();
      formData.append("id", id);
      axios({
        method: "post",
        url: "http://localhost:8081/backstage/deleteBookById",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
        data: formData
      }).then((resp) => {
        if (resp.data === 1) {
          this.myDelete(rows, id);
          this.$message({
            showClose: true, type: 'success',
            message: '删除成功！'
          });
        } else {
          this.$message({
            showClose: true, type: 'error',
            message: '删除失败，请重试'
          });
        }
      });
    },
    // 自定义的删除数组的方法
    myDelete(rows, id){
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].id === id) {
          rows.splice(i,1);
          break;
        }
      }
    },
    // 编辑图书
    editBook(id) {
      axios.get("http://localhost:8081/backstage/selectBookInfoById/" + id)
          .then((resp) => {
            this.book = resp.data;
            this.editBookVisible = true;
          });
    },
    // 提交编辑
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let book = {
            id: this.book.id,
            bookName: this.book.bookName,
            author: this.book.author,
            price: this.book.price,
            press: this.book.press,
            publicationDate: this.book.publicationDate,
            inventory: this.book.inventory,
            sales: this.book.sales,
            brief: this.book.brief,
            state: this.book.state,
            discount: this.book.discount,
            classificationCode: this.book.classificationCode,
            img: this.book.img
          };
          axios.put("http://localhost:8081/backstage/updateBookInfo", book)
              .then((resp) => {
                this.editBookVisible = false;
                if (resp.data === 1) {
                  this.initData();
                  this.$message({
                    type: 'success',
                    message: '修改成功！'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: '修改失败，请重试'
                  });
                }
              });
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加图书
    addBook(){
      this.addBookVisible = true;
    },
    // 提交添加
    submitAdd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let book = {
            id: this.book_add.id,
            bookName: this.book_add.bookName,
            author: this.book_add.author,
            price: this.book_add.price,
            press: this.book_add.press,
            publicationDate: this.book_add.publicationDate,
            inventory: this.book_add.inventory,
            sales: this.book_add.sales,
            brief: this.book_add.brief,
            state: this.book_add.state,
            discount: this.book_add.discount,
            classificationCode: this.book_add.classificationCode,
            img: this.book_add.img
          };
          axios.post("http://localhost:8081/backstage/addBook", book)
              .then((resp) => {
                this.addBookVisible = false;
                this.resetForm('addBook');
                if (resp.data === 1) {
                  this.initData();
                  this.$message({
                    type: 'success',
                    message: '添加成功！'
                  });
                } else {
                  this.$message({
                    type: 'error',
                    message: '添加失败，请重试'
                  });
                }
              });
        } else {
          return false;
        }
      });
    },
    // 初始化第一页的数据
    initData(){
      this.loading = true;
      axios.get("http://localhost:8081/backstage/selectBookInfo/1/10")
          .then((resp) => {
            this.bookData = resp.data.books;
            // 这样才能使得分页组件也重置
            this.currentPage = 1;
            this.total = null;
            this.$nextTick(() => {
              this.total = resp.data.total;
            });
            this.loading = false;
          });
    }
  },
  created() {
    this.initData();
  }
}
</script>

<style scoped>
#table {
  margin-top: 10px;
  border: 1px solid #eee;
  height: 500px;
}

#page {
  margin: 10px auto 0;
  display: table;
}

#table .table-expand {
  padding: 20px;
}

#table .table-expand .img {
  width: 180px;
  height: 250px;
}
</style>