import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Prop as PropInterface, State as StateInterface } from "../../interface/page/kami/view";
import ReactMarkdown from "react-markdown";
import { getUserId, getAuth } from '../../lib/auth';

class KamiEdit extends React.Component<PropInterface, StateInterface> {
    constructor(props: PropInterface) {
        super(props);
        const params: any = this.props.match.params;
        this.state = {
            loading: true,
            error: false,
            kamiId: params.kamiId
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: { target: { value: any; type: string; name: string; checked?: any; }; }) { 
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({ [name]: value });
    }

    handleSubmit(event: { preventDefault: () => void; }) {
        alert('A name was submitted: ' + this.state.title);
        event.preventDefault();
    }

    componentDidMount () {
        const authcode = getAuth();
        fetch(`https://c-datoyacx.vercel.app/api/v1/kami?id=${this.state.kamiId}&auth=${authcode}`)
          .then((res) => res.json())
          .then((res) => {
            this.setState({
                title: res.title,
                excerpt: res.excerpt,
                content: res.content,
                status: res.status,
                loading: false,
                error: false
            });
        })
    }

    render() {
        const { loading, error } = this.state;
        return (
            <div className="kami-create-section">
                <div className="editor">
                    <h3>kami create :)</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            title:
                            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                        </label>
                        <label>
                            status:
                            <select name="status" value={this.state.status} onChange={this.handleChange}>
                                <option value="public">public</option>
                                <option value="profile">only on profile</option>
                                <option value="unlist">unlist</option>
                                <option value="private">private</option>
                            </select>
                        </label>
                        <label>
                            content:
                            <textarea className="excerpt" name="excerpt" value={this.state.excerpt} onChange={this.handleChange} />
                        </label>
                        <label>
                            content:
                            <textarea className="content" name="content" value={this.state.content} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="edit" />
                    </form>
                </div>
                <div className="preview">
                    <h3>{this.state.title || 'no title'}</h3>
                    <ReactMarkdown>
                        {this.state.content || 'no content'}
                    </ReactMarkdown>
                </div>
            </div>
        )
    }
}

export default withRouter(KamiEdit);