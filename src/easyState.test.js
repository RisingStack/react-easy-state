require('reify')

const shallow = require('enzyme').shallow
const easyState = require('./easyState').default
const observer = require('@nx-js/observer-util')
const Component = require('react').Component
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const expect = chai.expect

class TestComp {
  constructor() {
    this.state = { name: 'Test' }
  }

  render () {
    return this.state.name
  }

  forceUpdate () {
    this.render()
  }
}

class StatelessComp {}

describe('easyState', () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => sandbox.restore())


  it('should replace the state with an observable', () => {
    const comp = new (easyState(TestComp))

    expect(comp.state).to.be.an('object')
    expect(observer.isObservable(comp.state)).to.be.true
    expect(comp.state.name).to.equal('Test')
  })

  it('should create an empty observable state if there is no state', () => {
    const comp = new (easyState(StatelessComp))

    expect(comp.state).to.be.an('object')
    expect(observer.isObservable(comp.state)).to.be.true
  })

  it('should overwrite the render method', () => {
    const comp = new (easyState(TestComp))

    expect(comp.render).to.be.a('function')
  })

  it('should instrument the render method', () => {
    const Component = easyState(TestComp)
    const comp = new Component()

    expect(Component.prototype.render).to.be.a('function')
    expect(TestComp.prototype.render).to.not.equal(comp.render)

    const renderSpy = sandbox.spy(TestComp.prototype, 'render')
    const updateSpy = sandbox.spy(TestComp.prototype, 'forceUpdate')

    comp.render()

    expect(renderSpy).to.be.calledOnce
    expect(updateSpy).to.not.be.called
  })

  it('should observe the render method', () => {
    const Component = easyState(TestComp)
    const comp = new Component()

    const renderSpy = sandbox.spy(TestComp.prototype, 'render')
    const updateSpy = sandbox.spy(TestComp.prototype, 'forceUpdate')

    comp.render()

    return Promise.resolve()
      .then(() => comp.state.name = 'Test1')
      .then(() => {
        expect(updateSpy).to.be.calledOnce
        expect(renderSpy).to.be.calledTwice
      })
      .then(() => comp.state.name = 'Test2')
      .then(() => {
        expect(updateSpy).to.be.calledTwice
        expect(renderSpy).to.be.calledThrice
      })
  })

  it('should not trigger a render method more than once per batch', () => {
    const Component = easyState(TestComp)
    const comp = new Component()

    const renderSpy = sandbox.spy(TestComp.prototype, 'render')
    const updateSpy = sandbox.spy(TestComp.prototype, 'forceUpdate')

    comp.render()

    return Promise.resolve()
      .then(() => {
        comp.state.name = 'Test1'
        comp.state.name = 'Test2'
      })
      .then(() => {
        expect(updateSpy).to.be.calledOnce
        expect(renderSpy).to.be.calledTwice
      })
  })
})
