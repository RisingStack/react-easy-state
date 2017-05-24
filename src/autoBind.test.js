require('reify')

const expect = require('chai').expect
const autoBind = require('./autoBind').default

describe('autoBind', () => {
  it('should set bound functions on target based on the passed proto', () => {
    const target = {
      name: 'Test'
    }
    const proto = {
      getName () {
        return this.name
      }
    }
    autoBind(target, proto)

    expect(target.getName).to.be.a('function')
    expect(target.getName()).to.equal('Test')
  })

  it('should ignore no function properties', () => {
    const target = {
      name: 'Test'
    }
    const proto = {
      description: 'This is a test'
    }
    autoBind(target, proto)

    expect(target.description).to.be.undefined
  })

  it('should ignore React internal methods', () => {
    const target = Object.create(null)
    const proto = {
      constructor: test,
      render: test,
      componentWillMount: test,
      componentDidMount: test,
      componentWillReceiveProps: test,
      shouldComponentUpdate: test,
      componentWillUpdate: test,
      componentDidUpdate: test,
      componentWillUnmount: test
    }
    function test () {
      return this.name
    }
    autoBind(target, proto)

    expect(target.constructor).to.be.undefined
    expect(target.render).to.be.undefined
    expect(target.componentWillMount).to.be.undefined
    expect(target.componentDidMount).to.be.undefined
    expect(target.componentWillReceiveProps).to.be.undefined
    expect(target.shouldComponentUpdate).to.be.undefined
    expect(target.componentWillUpdate).to.be.undefined
    expect(target.componentDidUpdate).to.be.undefined
    expect(target.componentWillUnmount).to.be.undefined
  })
})
